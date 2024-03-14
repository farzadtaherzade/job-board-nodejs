import { Router } from "express";
import { CompanyController } from "./company.controller";
import { Authorization } from "../../middlewares/authorization";
import ValidateBody from "../../middlewares/validation";
import { CreateCompanyDto } from "./dtos/createCompany.dto";
import { UpdateCompanyDto } from "./dtos/updateCompany.dto";
import { upload } from "../../utils/multer";

const companyRouter: Router = Router();
const companyController: CompanyController = new CompanyController();

companyRouter.post(
  "/",
  Authorization("EMPLOYER"),
  upload.single("image"),
  ValidateBody(CreateCompanyDto),
  companyController.createCompany
);

companyRouter.put(
  "/",
  ValidateBody(UpdateCompanyDto),
  Authorization("EMPLOYER"),
  companyController.updateCompany
);

companyRouter.patch(
  "/",
  Authorization("EMPLOYER"),
  upload.single("image"),
  companyController.changeLogo
);

companyRouter.get("/", companyController.getAllCompany);
companyRouter.get(
  "/my",
  Authorization("EMPLOYER"),
  companyController.myCompany
);
companyRouter.get("/:id", companyController.getCompany);

export default companyRouter;
