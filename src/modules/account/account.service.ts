import { Prisma, PrismaClient, Role, User } from "@prisma/client";
import { CreateUserDto } from "./dtos/createUser.dto";
import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../../helper/response";
import { UpdateResumeDto } from "./dtos/updateResume.dto";

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
  async getMe(user: User) {
    const result = await this.findUserById(user.id);
    return result;
  }

  async updateResume(user: User, updateUserDto: UpdateResumeDto) {
    updateUserDto.neighbourhood = updateUserDto.neighbourhood?.toLowerCase();
    const jobSeeker = await prisma.resume.findUnique({
      where: {
        userId: user?.id,
      },
    });
    console.log("jobseeker", jobSeeker);
    if (jobSeeker) {
      const updatedUser = await prisma.resume
        .update({
          where: {
            userId: user?.id,
          },
          data: updateUserDto,
        })
        .catch((err) => {
          if (err instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(err);
          }
          throw err;
        });
      return updatedUser;
    }
    updateUserDto.userId = user.id;

    const createdJobSeeker = await prisma.resume
      .create({
        data: updateUserDto,
      })
      .catch((err) => {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          console.log(err);
        }
        throw err;
      });
    console.log(createdJobSeeker);
    return createdJobSeeker;
  }

  // helper funciton
  async findUserByEmailAndRole(email: string, role?: Role) {
    const user = await prisma.user.findUnique({
      where: {
        email,
        role,
      },
    });

    return user;
  }
  async findUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        employer: true,
        resume: true,
      },
    });
    return user;
  }
}

export const accountService: AccountService = new AccountService();
