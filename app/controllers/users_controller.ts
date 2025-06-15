import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'



export default class UsersController {
  async index({}: HttpContext) {
    const users = await User.all()
    return users
  }

  async store({ request, response }: HttpContext) {
    const creds = request.only(['email', 'password'])
    if (!creds.email || !creds.password) return response.abort({})
    const user = await User.create(creds)
    return user
  }

  async show({ params, auth, response }: HttpContext) {
    const id = +params['id']
    if (id !== auth.user?.id) {
      return response.unauthorized({ message: 'Not authorized' })
    }
    const user = await User.find(id)
    return user
  }

  async update({ request, response, params, auth }: HttpContext) {
    const id = +params['id']
    if (id !== auth.user?.id) {
      return response.unauthorized({ message: 'Not authorized' })
    }
    
    const fullName = request.only(['fullName'])

    const user = await User.find(id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    const updatedUser = await User.updateOrCreate({ id: params['id'] }, fullName)

    return updatedUser
  }

  async whoAmI({ auth }: HttpContext) {
    const id = auth.user?.id
    const user = await User.find(id)
    return user
  }
}