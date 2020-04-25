import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import RoundType from 'App/Models/RoundType';
import RoundTypeValidator from 'App/Validators/RoundTypeValidator';

export default class RoundTypesController {
  public async index() {
    return RoundType.all();
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(RoundTypeValidator);
    return RoundType.create(data);
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const data = await ctx.request.validate(RoundTypeValidator);
    const roundType = await RoundType.findOrFail(id);
    roundType.merge(data);
    roundType.save();
    return roundType;
  }

  public async destroy(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const roundType = await RoundType.findOrFail(id);
    roundType.delete();
    return roundType;
  }
}
