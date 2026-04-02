


import express, { Router } from 'express'
import { postRoutes } from '../modules/post/post.route'
import { userRoutes } from '../modules/user/user.route'


const routers: Router = express.Router()


const moduleRoutes = [
  {
    path: '/posts',
    route: postRoutes
  },
  {
    path: "/users",
    route: userRoutes
  }
 
]


moduleRoutes.forEach(route => {
  routers.use(route.path, route.route)
})

export default routers