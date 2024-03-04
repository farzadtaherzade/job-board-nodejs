import { sendEmail } from "../utils/email";
import { generateOtp } from "./functions";
import { getValueFromRedis, setValueToRedis } from "./redis";

export const sendOtp = async (email: string) => {
  // check otp already exist
  const oldOtp = await getValueFromRedis(email);

  if (oldOtp) {
    return 0;
  }

  const ex_otp: any = process.env.EXPIRED_OTP_TIME;
  const otp = generateOtp();
  const result = await setValueToRedis(email, otp, ex_otp);
  if (result) {
    console.log("sending email");
    console.log(email);
    const emailResult = await sendEmail(email, "node job borad", otp);
    console.log(emailResult);
    return otp;
  }
  return false;
};
