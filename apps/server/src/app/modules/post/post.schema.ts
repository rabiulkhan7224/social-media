import z from "zod";

 const createPostSchema  = z.object({
  body: z.object({
    content: z.string().min(1, 'Content is required'),
    image: z.string().optional()
  })})
export default createPostSchema;


