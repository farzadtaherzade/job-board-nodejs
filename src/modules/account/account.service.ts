import { Prisma, PrismaClient, User } from "@prisma/client";
import { CreateUserDto } from "./dtos/createUser.dto";
import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../../helper/response";

const prisma = new PrismaClient();

export class AccountService {
  async createUser(createUserDto: CreateUserDto) {
    const user = await prisma.user
      .create({
        data: createUserDto,
      })
      .catch((err) => {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          console.log(err);
          if (err.code === "P2002") {
            throw ResponseHandler(
              StatusCodes.BAD_REQUEST,
              false,
              null,
              "There is a unique constraint violation, a new user cannot be created with this email or phone number"
            );
          }
        }
        throw err;
      });
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
  async findUserById() {}
}

export const accountService: AccountService = new AccountService();
