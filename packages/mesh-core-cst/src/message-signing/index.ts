import { customAlphabet } from "nanoid";

import { DataSignature, stringToHex } from "@meshsdk/common";

import { StricaPrivateKey, StricaPublicKey } from "../";

export const signData = (
  data: string,
  privateKey: StricaPrivateKey,
): DataSignature => {
  const payload = Buffer.from(data, "hex");
  const signature = privateKey.sign(payload).toString("hex");
  const publicKey = privateKey.toPublicKey().toBytes().toString("hex");

  return {
    key: publicKey,
    signature: signature,
  };
};

export const checkSignature = (
  data: string,
  { key, signature }: DataSignature,
) => {
  const publicKey = new StricaPublicKey(Buffer.from(key, "hex"));
  return publicKey.verify(
    Buffer.from(signature, "hex"),
    Buffer.from(data, "hex"),
  );
};

export const generateNonce = (label = "", length = 32) => {
  if (length <= 0 || length > 2048) {
    throw new Error("Length must be bewteen 1 and 2048");
  }
  const randomString = customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  );
  const payload = randomString(length);
  return stringToHex(`${label}${payload}`);
};
