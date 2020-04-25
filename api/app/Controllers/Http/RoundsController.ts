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
    const roundType = await Round.findOrFail(id);
    roundType.merge(data);
    roundType.save();
    return roundType;
  }

  public async destroy(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const roundType = await Round.findOrFail(id);
    roundType.delete();
    return roundType;
  }
}
