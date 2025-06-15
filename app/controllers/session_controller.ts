import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async store({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)

    return response.ok({
      success: true
    })
  }
  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.ok({
      success: true
    })
  }
  
}