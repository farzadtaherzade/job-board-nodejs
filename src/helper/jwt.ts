import { getValueFromRedis, setValueToRedis } from "./redis";
import { PrismaClient, Role, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import ResponseHandler from "./response";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

export interface Ipayload {
  email: string;
  sub: number;
}

export const signToken = (payload: Ipayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: "3600s",
  });
  return token;
};

export const signRefreshToken = async (payload: Ipayload) => {
  const token = jwt.sign(payload, process.env.REFRESH_SECRET_KEY!, {
    expiresIn: "10d",
  });
  await setValueToRedis(`${payload.sub}`, token, 10 * 60 * 60);
  return token;
};

export const verifyRefreshToken = async (
  token: string
): Promise<User | null> => {
  const { sub } = jwt.verify(
    token,
    process.env.REFRESH_SECRET_KEY!
  ) as jwt.JwtPayload;
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: Number(sub),
    },
  });
  if (!user)
    throw ResponseHandler(
      StatusCodes.UNAUTHORIZED,
      false,
      null,
      "login to your account"
    );
  const refreshToken: string | number = await getValueFromRedis(`${user.id}`);
  console.log(refreshToken);
  console.log("refreshToken : ", refreshToken);
  console.log("recive token : ", token);
  if (token == refreshToken) return user;
  throw ResponseHandler(
    StatusCodes.UNAUTHORIZED,
    false,
    null,
    "server couldn't signin you!" // change this error message
  );
};
