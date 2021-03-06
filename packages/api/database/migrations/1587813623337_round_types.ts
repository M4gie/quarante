import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class RoundTypes extends BaseSchema {
  protected tableName = 'round_types';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('title', 80);
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
