import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

import Answer from './Answer';

export default class Round extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public data: string;

  @column()
  public description: string;

  @hasMany(() => Answer)
  public answers: HasMany<typeof Answer>;

  @column()
  public round_type_id: number;

  @column()
  public theme_id: number;

  @column()
  public validated: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
