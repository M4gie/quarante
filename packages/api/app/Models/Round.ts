import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

export default class Round extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public data: string;

  @column()
  public answer: string;

  @column()
  public round_type_id: number;

  @column()
  public theme_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
