import { Router } from "express";
import validateRequest from "./../../middlewares/validateRequest";
import { createPosted, getAllPosts } from "./post.controller";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { createPostSchema } from "./post.schema";

const router = Router();

router.get("/", getAllPosts);
router.post("/create", validateRequest(createPostSchema),authMiddleware(), createPosted);

export const postRoutes: Router = router;
