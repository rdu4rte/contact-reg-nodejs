import { TYPES } from "./../../ioc/types";
import { inject, injectable } from "inversify";
import { ClientRepository } from "../client/client.repository";
import { CredentialsDTO } from "./dto/credentials.dto";
import { IToken } from "./interface/token.interface";
import { Auth } from "../../shared/utils/auth.utils";
import { Validator } from "../../shared/utils/validator.utils";

@injectable()
export class AuthService {
  constructor(
    @inject(TYPES.ClientRepository) private clientRepository: ClientRepository,
    @inject(TYPES.Validator) private validator: Validator,
    @inject(TYPES.Auth) private auth: Auth,
  ) {}

  // authentication
  public async signin(credentialsDto: CredentialsDTO): Promise<IToken | { detail: string }> {
    // class validation
    const result = await this.validator
      .classValidation(CredentialsDTO, credentialsDto)
      .then((validated: CredentialsDTO) => {
        if (validated) {
          return validated;
        }
      });

    const user = await this.clientRepository.getByName(result.username);
    const isMatch = await this.auth.matchPasswords(user.password, result.password);

    if (user && isMatch) {
      return this.auth.createToken(user);
    } else {
      return {
        detail: "Invalid credentials",
      };
    }
  }
}
