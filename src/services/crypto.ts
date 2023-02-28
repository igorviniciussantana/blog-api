import { enc, AES } from "crypto-ts";

const secret = process.env.MY_SECRET || "";

export function encrypt(message: string) {
  const ciphertext = AES.encrypt(message, secret);

  return ciphertext.toString();
}

export function decrypt(message: string) {
  const bytes = AES.decrypt(message, secret);
  const plaintext = bytes.toString(enc.Utf8);

  return plaintext;
}
