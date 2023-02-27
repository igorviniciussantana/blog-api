import {AES} from 'crypto-ts'
 
// Encrypt
var ciphertext = AES.encrypt('my message', 'secret key 123');
 
// Decrypt
export var bytes  = AES.decrypt(ciphertext.toString(), 'secret key 123');
 
console.log(bytes);