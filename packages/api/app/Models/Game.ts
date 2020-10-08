import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import GameType from 'App/Models/GameType';
import Theme from 'App/Models/Theme';
import { DateTime } from 'luxon';

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public themeId: number;

  @belongsTo(() => Theme)
  public theme: BelongsTo<typeof Theme>;

  @column()
  public gameTypeId: number;

  @belongsTo(() => GameType)
  public gameType: BelongsTo<typeof GameType>;

  @column()
  public icon: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
