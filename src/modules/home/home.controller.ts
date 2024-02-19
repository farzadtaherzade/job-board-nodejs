import { NextFunction, Request, Response } from "express";

class HomeController {
  helloWorld(req: Request, res: Response, next: NextFunction) {
    try {
      return res.send("hello world");
    } catch (error) {
      next(error);
    }
  }
}

export const homeController = new HomeController();
