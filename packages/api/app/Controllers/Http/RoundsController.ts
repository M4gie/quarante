import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Round from 'App/Models/Round';
import RoundValidator from 'App/Validators/RoundValidator';

export default class RoundsController {
  public async index() {
    return Round.query().preload('answers');
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(RoundValidator);
    const round = await Round.create(data);
    const answers = await round.related('answers').createMany(data.answers);
    return { round, answers };
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
    // TODO Check if params are arrays of numbers
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
