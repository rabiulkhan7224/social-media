import { Router } from "express";

const router = Router();


router.get("/", (_req, res) => {
  res.status(200).json({ message: "Get all posts" });
}
);


export const postRoutes: Router = router;