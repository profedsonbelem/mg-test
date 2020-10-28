import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import { Intake } from "../../types/intake";
import { SecureLink } from "../../types/questionnaireAnswers";
import { key as DevKey, iv as DevIv } from "./env";
import { TokenPayload } from "../../types/tokenPayload";

/**
 * Create unique link with security
 */
export function createUniqueLinkWithSecurity(intake: Intake): SecureLink {
  console.log("CREATE UNIQUE LINK");
  // console.log('id', objId);
  console.log(`Encrypting with ${process.env.cryptoKey} and ${process.env.iv}`);

  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(process.env.cryptoKey, "hex"),
    Buffer.from(process.env.iv, "hex")
  );

  const payload: TokenPayload = { userId: intake._id, userEmail: intake.email };
  let encrypted = cipher.update(JSON.stringify(payload));
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  const tk = encrypted.toString("hex");

  return {
    _id: intake._id,
    email: intake.email,
    token: tk,
  };
}

export function tokenToSecureLink(token: string): SecureLink {
  try {
    const decryptedAsString = decryptToken(token);
    const decryptedAsJSON: TokenPayload = JSON.parse(decryptedAsString);

    return {
      _id: decryptedAsJSON.userId,
      email: decryptedAsJSON.userEmail,
      token,
    };
  } catch (error) {
    console.log("ERROR - ", error);
    throw error;
  }
}

/** @todo get key&iv pair from somewere */
export function decryptToken(token: string) {
  const keyIvPairs: { key: string; iv: string }[] = [
    { key: process.env.cryptoKey, iv: process.env.iv },
    { key: DevKey, iv: DevIv },
  ];

  for (let i in keyIvPairs) {
    const { key, iv } = keyIvPairs[i];

    try {
      console.log(`Decrypting with ${key} and ${iv}`);
      const decrypted = decryptWithKeyAndIV(token, key, iv);

      return decrypted;
    } catch (error) {
      console.log(`Failed decrypt with ${key} and ${iv}`);
    }
  }

  throw new Error(`Couldn't decrypt ${token}`);
}

function decryptWithKeyAndIV(token: string, key: string, iv: string) {
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key, "hex"),
    Buffer.from(iv, "hex")
  );

  console.log("Decrypting", token);
  let decrypted = decipher.update(token, "hex", "utf8");
  decrypted += decipher.final("utf8");

  console.log(`Decripted: ${decrypted}`);
  return decrypted;
}

export function decodeJWT(token: string): TokenPayload {
  console.log(`Decoding JWT ${token}`);
  const decodedToken = <TokenPayload>jwt.verify(token, process.env.secret);
  console.log(`Decoded as ${JSON.stringify(decodedToken)}`);

  return decodedToken;
}

export function createJWT(payload: TokenPayload) {
  console.log(`Creating JWT for ${JSON.stringify(payload)}. Expires in 30m`);
  const token = jwt.sign(payload, process.env.secret, {
    expiresIn: "30m",
  });
  console.log(`Token: ${token}`);

  return token;
}
