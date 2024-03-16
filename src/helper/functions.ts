export const generateRandomFileName = (ext: string, length: number) => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `${result}${ext}`;
};

export const generateOtp = () => {
  const min = 10000;
  const max = 99999;
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  return otp;
};