import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class GameTypeValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.maxLength(80)]),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    'title.required': 'Title is required',
    'title.maxLength': 'Title lenght must be lower than 80 characters',
  };
}
