import {enc ,AES} from 'crypto-ts'

const secret = process.env.MY_SECRET || '';
 
// Encrypt
const ciphertext = AES.encrypt('santana123', secret);

 console.log(ciphertext.toString());
// Decrypt

export const bytes  = AES.decrypt(ciphertext.toString(), secret);
export const plaintext = bytes.toString(enc.Utf8);
 
