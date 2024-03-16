import { Prisma, PrismaClient, User } from "@prisma/client";
import { sendEmail } from "../../utils/email";
import ResponseHandler from "../../helper/response";
import { StatusCodes } from "http-status-codes";


const prisma: PrismaClient = new PrismaClient();

export class AdminService {
  async getCompanies(confirm: boolean) {
    const where = confirm === undefined ? { confirm } : {}
    const companies = await prisma.company.findMany({
      where
    })
    return companies
  }
  async confirmCompany(id: number) {
    const company = await prisma.company.update({
      where: {
        id
      },
      data: {
        confirm: true,
      },
      include: {
        employer: {
          include: {
            user: true
          }
        },
      }
    }).catch(err => {
      if (err instanceof Prisma.PrismaClientKnownRequestError) throw ResponseHandler(StatusCodes.NOT_FOUND, false, null, "company not found")
    })
    await sendEmail(company?.employer?.user?.email!, "Company confirm", "Your company confirm by admin, now you can add jobs!")
    return "company confirmed successfully"
  }
}