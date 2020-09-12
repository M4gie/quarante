import Application from '@ioc:Adonis/Core/Application';
import Config from '@ioc:Adonis/Core/Config';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Round from 'App/Models/Round';
import RoundValidator from 'App/Validators/RoundValidator';
import { readFileSync } from 'fs';
import NextcloudClient from 'nextcloud-link';

export default class RoundsController {
  public async index() {
    return Round.query().preload('answers');
  }

  public async store({ request }: HttpContextContract) {
    const { file, theme_id } = await request.validate(RoundValidator);
    const { answers } = request.only(['answers']);
    let parsedAnswers: { answer: string }[] = JSON.parse(answers);
    parsedAnswers = parsedAnswers.filter((answer) => answer.answer.length > 1);
    parsedAnswers = parsedAnswers.map((answer) => {
      return { answer: answer.answer.toLocaleLowerCase() };
    });
    console.log(file);
    if (file) {
      const round = await Round.create({ theme_id, round_type_id: 1 });
      const answers = await round.related('answers').createMany(parsedAnswers);
      await file.move(Application.tmpPath('uploads'), {
        name: `${round.id.toString()}.mp3`,
      });
      const filePublicUrl = await uploadFile(file);
      if (filePublicUrl) {
        round.data = filePublicUrl;
        await round.save();
      }
      return { round, answers };
    }
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const data = await ctx.request.validate(RoundValidator);
    const round = await Round.findOrFail(id);
    await round.related('answers').query().delete();
    const answers = await round.related('answers').createMany(data.answers);
    round.merge(data);
    round.save();
    return { round, answers };
  }

  public async destroy(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const round = await Round.findOrFail(id);
    round.delete();
    return round;
  }

  public async random({ request }: HttpContextContract) {
    const { themes = [] }: { themes: number[] } = request.only(['themes']);

    if (!themes) return [];
    const rounds = await Round.query().whereIn('theme_id', themes).preload('answers');
    const selectRounds: Round[] = [];
    for (let i = 0; i < 100 && rounds.length > 0; i++) {
      const rand = Math.floor(Math.random() * rounds.length);
      selectRounds.push(rounds[rand]);
      rounds.splice(rand, 1);
    }
    return selectRounds;
  }
}

async function uploadFile(file) {
  const cloudConfig = Config.get('app.cloud');
  const client = new NextcloudClient({
    url: cloudConfig.url,
    password: cloudConfig.password,
    username: cloudConfig.user,
  });
  await client.checkConnectivity();
  if (file.filePath) {
    try {
      const cloudFilePath = `${cloudConfig.path}sounds/${file.fileName}`;
      await client.put(cloudFilePath, readFileSync(file.filePath));
      const ret = await client.shares.add(cloudFilePath, 3 /* PUBLIC LINK */);
      return ret.url + '/download';
    } catch (e) {
      // USE LOGGER
    }
  }
  return null;
}
