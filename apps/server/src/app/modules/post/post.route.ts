import { Router } from "express";
import validateRequest from './../../middlewares/validateRequest';
import { createPosted } from "./post.controller";
import createPostSchema from "./post.schema";

const router = Router();


router.get("/", (_req, res) => {
  res.status(200).json({ message: "Get all posts" });
}
);
router.post("/create", validateRequest(createPostSchema),createPosted);


export const postRoutes: Router = router;