import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

type IndexMethod = Exclude<Awaited<ReturnType<InstanceType<typeof PostsController>['index']>>, void>



export default class PostsController {
  async index({ auth, response, request }: HttpContext) {
    const userId = auth.user?.id
    if (!userId) return response.unauthorized()
    const page = request.input('page', 1)
    const limit = 10
    const posts = await Post.query().preload('user', (query) => query.select(['fullName'])).paginate(page, limit)

    return posts
  }

  async show({ params, auth, response }: HttpContext) {
    const userId = auth.user?.id
    if (!userId) return response.unauthorized()
    const postId = +params['id']
    
    if (!postId) return response.notFound()

    const post = await Post.query().where('id', postId).preload('user', (q) => q.select(['fullName'])).first()

    return post
  }

  async store({ request, auth, response }: HttpContext) {
    const userId = auth.user?.id
    if (!userId) return response.unauthorized()
    const input = request.only(['title', 'description'])



    const post = await Post.create({
      authorId: userId,
      title: input.title,
      description: input.description
    })

    return post
  }
}