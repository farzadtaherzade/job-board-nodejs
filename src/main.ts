import morgan from "morgan";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes/app.routes";
import { conenctRedisClient } from "./config/redisConnect";

export const app: Application = express();
const port = process.env.PORT || 6000;

export let client: any;

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/v1", router);

// handle errors
app.use((req: Request, res: Response, next: NextFunction) => {
  const response = {
    statusCode: 404,
    message: "NotFoundPage",
  };
  return res.status(404).json(response);
});
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = +error?.statusCode || 500;
  const message: string = error?.message || "internalServerError";
  const response = {
    statusCode,
    message,
  };
  return res.status(statusCode).json(response);
});
async function bootstrap() {
  // connect redis
  client = await conenctRedisClient();

  // running app
  app.listen(port, () =>
    console.log(`server run on: http://localhost:${port}`)
  );
}

bootstrap();
