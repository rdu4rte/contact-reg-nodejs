import { IToken } from "./../../modules/auth/interface/token.interface";
import { jwtSecret, jwtExpires } from "./../../config/env.config";
import { injectable } from "inversify";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

@injectable()
export class Auth {
  // match passwords
  public async matchPasswords(p1: string, p2: string): Promise<boolean> {
    return await argon2.verify(p1, p2);
  }

  // create tokens
  public async createToken(user: { id: number; name: string }): Promise<IToken> {
    const payload = { id: user.id, name: user.name };

    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: jwtExpires,
    });

    return { token };
  }
}
