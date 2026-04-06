import { Router } from "express";
import validateRequest from "./../../middlewares/validateRequest";
import { createPosted, getAllPosts, getPostByIdController } from "./post.controller";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { createPostSchema, getPostsSchema } from "./post.schema";

const router = Router();

router.get("/", validateRequest(getPostsSchema), getAllPosts);
router.post("/create", validateRequest(createPostSchema),authMiddleware(), createPosted);
router.get('/:id', getPostByIdController);

export const postRoutes: Router = router;
