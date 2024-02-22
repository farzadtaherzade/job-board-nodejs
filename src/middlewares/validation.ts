import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ClientError } from "../error/clientError";

const ValidateBody = (validationSchema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const clientError = new ClientError();
    const validationClass = plainToInstance(validationSchema, body);
    try {
      await validate(validationClass, {
        whitelist: true,
      }).then((errors) => {
        if (errors.length > 0) {
          clientError.statusCode = 400;
          clientError.data = null;
          clientError.messages = errors.map((error: any) => {
            return {
              [error.property]: Object.values(error.constraints),
            };
          });
          throw clientError;
        }
        req.body = validationClass;
        console.log(req.body);
        next();
      });
    } catch (error) {
      res.status(400).json(error);
    }
  };
};
export default ValidateBody;
