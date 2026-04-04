import { auth } from "@social-media/auth";
import { env } from "@social-media/env/server";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import routers from "./app/routers";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app = express();
const port = process.env.PORT || 3000
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.all("/api/auth{/*path}", toNodeHandler(auth));

app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).send("OK");
});
app.get("/api/me", async (req, res) => {
 	const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
	return res.json(session);
});

// API routes
app.use('/v1/api',  routers)
// Error handling middleware
app.use(globalErrorHandler as unknown as express.ErrorRequestHandler)
app.use(notFound as unknown as express.ErrorRequestHandler)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

