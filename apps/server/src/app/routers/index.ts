import express, { Router } from "express";
import { postRoutes } from "../modules/post/post.route";
import { userRoutes } from "../modules/user/user.route";
import { commentRoutes } from "../modules/comment/comment.route";
import { likeRoutes } from "../modules/like/like.route";

const routers: Router = express.Router();

const moduleRoutes = [
  {
    path: "/posts",
    route: postRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/comments",
    route: commentRoutes,
  },
  {
    path: "/likes",
    route: likeRoutes,
  }

];

moduleRoutes.forEach((route) => {
  routers.use(route.path, route.route);
});

export default routers;
