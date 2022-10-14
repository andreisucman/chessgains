import encUTF8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';
import ls from "localstorage-slim";

export async function encrypt() { 
  ls.config.encrypt = true; // global encryption
  ls.config.secret = "data:audio/wav;base64"; // global secret

  // update encrypter to use AES encryption
  ls.config.encrypter = (data, secret) => AES.encrypt(JSON.stringify(data), secret).toString();

  // update decrypter to decrypt AES-encrypted data
  ls.config.decrypter = (data, secret) => {
    try {
      return JSON.parse(AES.decrypt(data, secret).toString(encUTF8));
    } catch (e) {
      // incorrect/missing secret, return the encrypted data instead
      return data;
    }
  };
}