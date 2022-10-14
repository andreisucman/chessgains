// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import encUTF8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';
import ls from "localstorage-slim";

export default async function encrypt(req, res) {
  const data = req.data;
  const namespace = req.namespace;
  const customParams = req.customParams;
  const justEncrypt = req.justEncrypt;
  const secret = "hello";

  if (namespace && customParams) {
    ls.config.secret = secret;
    ls.config.encrypter = (data, secret) => AES.encrypt(JSON.stringify(data), secret).toString();
  
    ls.set(namespace, Object.assign({}, data, customParams, { encrypt: true }));
  }

  if (justEncrypt) {
    res.status(200).json(AES.encrypt(JSON.stringify(data), secret).toString());
  }
}

export default async function decrypt(req, res) {
  const namespace = req.namespace;
  const secret = "hello";

  ls.config.secret = secret;
  ls.config.decrypter = (data, secret) => {
    try {
      return JSON.parse(AES.decrypt(data, secret).toString(encUTF8));
    } catch (e) {
      // incorrect/missing secret, return the encrypted data instead
      return data;
    }
  };

  const data = ls.get(namespace, { decrypt: true, secret });
  res.status(200).json(data);
}
