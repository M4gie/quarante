import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class GameValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    themeId: schema.number([rules.exists({ table: 'themes', column: 'id' })]),
    gameTypeId: schema.number([rules.exists({ table: 'game_types', column: 'id' })]),
    icon: schema.string({ trim: true }, [rules.maxLength(80)]),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    'themeId.required': 'Theme ID is required',
    'themeId.exists': 'Unknown theme ID',
    'gameTypeId.required': 'Game type ID is required',
    'gameTypeId.exists': 'Unknown game type ID',
    'icon.required': 'Round type ID is required',
    'icon.maxLength': 'Icon lenght must be lower than 80 characters',
  };
}
