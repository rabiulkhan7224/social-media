import { Router } from "express";

const router = Router();


router.get("/", (_req, res) => {
  res.status(200).json({ message: "Get all user" });
}
);


export const userRoutes: Router = router;