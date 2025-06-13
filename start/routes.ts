/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import SessionController from '#controllers/session_controller'

router.group(() => {
  router.get('users', [UsersController, 'index'])
  router.get('users/:id', [UsersController, 'show'])
  router.patch('users/:id', [UsersController, 'update'])
  router.post('logout', [SessionController, 'logout'])
}).use(middleware.auth())

router.post('login', [SessionController, 'store'])
router.post('users', [UsersController, 'store'])
