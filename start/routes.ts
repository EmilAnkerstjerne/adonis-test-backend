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
import PostsController from '#controllers/posts_controller'

router.get('users', [UsersController, 'index'])
router.group(() => {
  router.get('users/:id', [UsersController, 'show'])
  router.patch('users/:id', [UsersController, 'update'])
  router.get('whoami', [UsersController, 'whoAmI'])
  router.get('posts', [PostsController, 'index'])
  router.get('posts/:id', [PostsController, 'show'])
  router.post('posts', [PostsController, 'store'])
  router.post('logout', [SessionController, 'logout'])
}).use(middleware.auth())

router.post('login', [SessionController, 'store'])
router.post('signup', [UsersController, 'store'])
