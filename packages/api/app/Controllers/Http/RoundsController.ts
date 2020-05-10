import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Round from 'App/Models/Round';
import RoundValidator from 'App/Validators/RoundValidator';

export default class RoundsController {
  public async index() {
    return Round.all();
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(RoundValidator);
    return Round.create(data);
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const data = await ctx.request.validate(RoundValidator);
    const round = await Round.findOrFail(id);
    round.merge(data);
    round.save();
    return round;
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
    const rounds = await Round.query().whereIn('theme_id', themes).select('*');
    const selectRounds: Round[] = [];
    for (let i = 0; i < 100 && rounds.length > 0; i++) {
      const rand = Math.floor(Math.random() * rounds.length);
      selectRounds.push(rounds[rand]);
      rounds.splice(rand, 1);
    }
    return selectRounds;
  }
}
