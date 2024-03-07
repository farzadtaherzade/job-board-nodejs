import { Prisma, PrismaClient, Resume, Role, User } from "@prisma/client";
import { CreateUserDto } from "./dtos/createUser.dto";
import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../../helper/response";
import { UpdateResumeDto } from "./dtos/updateResume.dto";
import {
  deleteResourceToCloudinary,
  getResourceToCloudinary,
  uploadToCloudinary,
} from "../../helper/uploadCloudinary";

const prisma: PrismaClient = new PrismaClient();

export class AccountService {
  async uploadResume(user: User, file: Express.Multer.File) {
    const resume = await this.findResumeByUserId(user.id);
    if (!resume)
      throw ResponseHandler(
        StatusCodes.BAD_REQUEST,
        false,
        null,
        "before upload your self made resume. go update resume info in our website"
      );
    const uploadResult: string = await uploadToCloudinary(file.path, "resume");
    if (!uploadResult)
      throw ResponseHandler(
        StatusCodes.INTERNAL_SERVER_ERROR,
        false,
        null,
        "upload resume failed"
      );
    const updateResume = await prisma.resume.update({
      where: {
        userId: user.id,
      },
      data: {
        resume: uploadResult,
      },
    });
    const deleteResouce = await deleteResourceToCloudinary(resume.resume);
    return "upload resume";
  }
  async uploadProfile(user: User, file: Express.Multer.File) {
    const resume = await this.findResumeByUserId(user.id);
    if (!resume)
      throw ResponseHandler(
        StatusCodes.BAD_REQUEST,
        false,
        null,
        "before upload your self made resume. go update resume info in our website"
      );
    const result: string = await uploadToCloudinary(file.path, "profile");
    const updateResume = await prisma.resume.update({
      where: {
        userId: user.id,
      },
      data: {
        profile_image: result,
      },
    });
    const deleteResouce = await deleteResourceToCloudinary(
      resume.profile_image
    );
    return "upload profile";
  }
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
    const resume: Resume | null = await this.findResumeByUserId(user.id);
    const profile_picture = resume
      ? await getResourceToCloudinary(resume.profile_image!)
      : null;
    const result: User | null = await this.findUserById(user.id);
    return result;
  }

  async updateResume(user: User, updateUserDto: UpdateResumeDto) {
    updateUserDto.neighbourhood = updateUserDto.neighbourhood?.toLowerCase();
    const resume = await this.findResumeByUserId(user.id);
    if (resume) {
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

  async getResume(user: User) {
    const resume = await this.findResumeByUserId(user.id);
    if (!resume)
      throw ResponseHandler(
        StatusCodes.NOT_FOUND,
        false,
        null,
        "Resume not found. for create your own resume or upload your resume"
      );
    const profile_image = await getResourceToCloudinary(resume.profile_image!);
    resume.profile_image = profile_image;
    return resume;
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
  async findResumeByUserId(userId: number) {
    const resume = await prisma.resume.findUnique({
      where: {
        userId,
      },
    });
    return resume;
  }
}

export const accountService: AccountService = new AccountService();
