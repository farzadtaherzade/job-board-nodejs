import { client } from "../main";

export const setValueToRedis = async (
  key: string,
  value: any,
  duration: number
) => {
  const result = await client.set(key, value, { EX: duration * 60 });
  return result === "OK";
};

export const getValueFromRedis = async (key: string) => {
  const value = await client.get(key);
  return value;
};

export const getTtlOfKey = async (key: string) => {
  const ttl = await client.ttl(key);
  return ttl;
};
