import Cryptr from "cryptr";

const cryptr = new Cryptr("Digital_Q-Talent", { encoding: "base64", pbkdf2Iterations: 10000, saltLength: 10 });

export const DecryptData = (encryptedString: string) => {
  const decryptedString = encryptedString && cryptr.decrypt(encryptedString);
  return decryptedString;
};

export const EncryptData = (dataString: string) => {
  const decryptedString = dataString && cryptr.encrypt(dataString);
  return decryptedString;
};
