import { UserFactory } from '#database/factories/user_factory'
import { test } from '@japa/runner'

test.group('Posts list', () => {
  test('example test', async ({ assert, client }) => {
    const user = await UserFactory.create()

    const response = await client.get('/posts').loginAs(user)
    response.assertStatus(200)
    const body = response.body()
    assert.onlyProperties(body, ['meta', 'data'])
    assert.isArray(body.data)
    assert.onlyProperties(body.data[0], ['id', 'title', 'description', 'createdAt', 'likes', 'updatedAt', 'user', 'authorId'])
    assert.onlyProperties(body.data[0].user, ['id', 'fullName'])

    
  })
})