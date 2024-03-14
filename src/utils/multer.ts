import multer, { Multer } from "multer";
import createHttpError from "http-errors";
import { Request } from "express";

const storage = multer.diskStorage({});

export const upload: Multer = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter: (_: Request, file: Express.Multer.File, cb) => {
    if (file.fieldname == "image") {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
      } else {
        cb(new createHttpError.BadRequest("type must be jpeg or png"));
      }
    } else if (file.fieldname == "resume") {
      console.log(file);
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new createHttpError.BadRequest("type must be pdf"));
      }
    }
  },
});
