import { BaseSchema } from '@adonisjs/lucid/schema'


//   @column()
//   declare title: string

//   @column()
//   declare description: string

//   @column()
//   declare likes: number

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title').notNullable()
      table.string('description').notNullable()
      table.bigint('likes').defaultTo(0)
      table.integer('author_id').unsigned().references('users.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}