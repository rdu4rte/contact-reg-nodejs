import { inject, injectable } from "inversify";
import Logger from "../../config/logger.config";
import { TYPES } from "../../ioc/types";
import { ClientRepository } from "./client.repository";
import { ClientMac } from "./entity/client-mac.entity";
import { ClientVar } from "./entity/client-var.entity";
import { Validator } from "../../shared/utils/validator.utils";
import { ClientDTO } from "./dto/client.dto";

@injectable()
export class ClientService {
  private logger = Logger;

  constructor(
    @inject(TYPES.ClientRepository) private clientRepository: ClientRepository,
    @inject(TYPES.Validator) private validator: Validator,
  ) {}

  // fetch users
  public async fetchUsers(): Promise<{ macapaClients: ClientMac[]; varejaoClients: ClientVar[] }> {
    const users = await this.clientRepository.fetchUsers();
    this.logger.verbose("Fetching users from both DBs");
    return users;
  }

  // auto generate clients: Macapá and VareJão
  public async generateClients(): Promise<{ detail: ClientDTO[] }> {
    const macUser = {
      name: "macapa",
      password: "123123",
    };

    const varUser = {
      name: "varejao",
      password: "123123",
    };

    // class validation
    const result1 = await this.validator.classValidation(ClientDTO, macUser).then((validated: ClientDTO) => {
      if (validated) {
        return validated;
      }
    });

    const result2 = await this.validator.classValidation(ClientDTO, varUser).then((validated: ClientDTO) => {
      if (validated) {
        return validated;
      }
    });

    await this.clientRepository.insertOnMac(result1);
    await this.clientRepository.insertOnVar(result2);
    return {
      detail: [result1, result2],
    };
  }

  // get user by name
  public async getByName(name: string): Promise<ClientMac | ClientVar> {
    return await this.clientRepository.getByName(name);
  }
}
