import { Router } from "express";
import validateRequest from "./../../middlewares/validateRequest";
import { createPosted, getAllPosts } from "./post.controller";
import createPostSchema from "./post.schema";

const router = Router();

router.get("/", getAllPosts);
router.post("/create", validateRequest(createPostSchema), createPosted);

export const postRoutes: Router = router;
