import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Rounds extends BaseSchema {
  protected tableName = 'rounds';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('data', 500);
      table.string('answer', 80);
      table.integer('round_type_id').unsigned();
      table.foreign('round_type_id').references('round_types.id').onDelete('CASCADE');
      table.integer('theme_id').unsigned();
      table.foreign('theme_id').references('themes.id').onDelete('CASCADE');
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
