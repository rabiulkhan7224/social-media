import type { RequestHandler } from 'express';
import catchAsync from "@/app/utils/catchAsync";

export const createPosted: RequestHandler = catchAsync(async (req, res) => {
  res.status(201).json({
    message: "Post created successfully",
    data: req.body
  });
});
