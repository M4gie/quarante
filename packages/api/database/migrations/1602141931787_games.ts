import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Games extends BaseSchema {
  protected tableName = 'games';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('theme_id').unsigned();
      table.foreign('theme_id').references('themes.id').onDelete('CASCADE');
      table.integer('game_type_id').unsigned();
      table.foreign('game_type_id').references('game_types.id').onDelete('CASCADE');
      table.string('icon', 80).notNullable();
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
