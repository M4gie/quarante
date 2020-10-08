import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import GameType from 'App/Models/GameType';
import GameTypeValidator from 'App/Validators/GameTypeValidator';

export default class GameTypesController {
  public async index() {
    return GameType.all();
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(GameTypeValidator);
    return GameType.create(data);
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const data = await ctx.request.validate(GameTypeValidator);
    const gameType = await GameType.findOrFail(id);
    return gameType.merge(data).save();
  }

  public async destroy(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const gameType = await GameType.findOrFail(id);
    gameType.delete();
    return gameType;
  }
}
