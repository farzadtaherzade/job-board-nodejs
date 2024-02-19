import "reflect-metadata";
import morgan from "morgan";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./routes/app.routes";
import { MikroORM, RequestContext } from "@mikro-orm/postgresql";
import { initializeORM } from "./config/database";

async function bootstrap() {
  const app: Application = express();
  const port = process.env.PORT || 6000;

  const orm = await initializeORM(__dirname);
  console.log(orm.em);

  // middleware
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
  });

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
    const statusCode: number = +error?.status || 500;
    const message: string = error?.message || "internalServerError";
    const response = {
      statusCode,
      message,
      errors: error?.errors || [],
    };
    return res.status(statusCode).json(response);
  });

  // running app
  app.listen(port, () =>
    console.log(`server run on: http://localhost:${port}`)
  );
}

bootstrap();
