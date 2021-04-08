import { injectable } from "inversify";
import { getConnection, InsertResult } from "typeorm";
import { ClientMac } from "./entity/client-mac.entity";
import { ClientDTO } from "./dto/client.dto";
import { ClientVar } from "./entity/client-var.entity";

@injectable()
export class ClientRepository {
  private connVar;
  private connMac;

  constructor() {
    this.connMac = getConnection("macapa");
    this.connVar = getConnection("varejao");
  }

  // register user for Macapá
  public async insertOnMac(clientDto: ClientDTO): Promise<any> {
    const entity = Object.assign(new ClientMac(), {
      name: clientDto.name,
      password: clientDto.password,
    });

    return this.connMac
      .createQueryBuilder()
      .insert()
      .into(ClientMac)
      .values(entity)
      .execute()
      .then((value: InsertResult) => {
        return value;
      });
  }

  // register user for VareJão
  public async insertOnVar(clientDto: ClientDTO): Promise<any> {
    const entity = Object.assign(new ClientVar(), {
      name: clientDto.name,
      password: clientDto.password,
    });

    return this.connVar
      .createQueryBuilder()
      .insert()
      .into(ClientVar)
      .values(entity)
      .execute()
      .then((value: InsertResult) => {
        return value;
      });
  }

  // fetch users
  public async fetchUsers(): Promise<{ macapaClients: ClientMac[]; varejaoClients: ClientVar[] }> {
    const macClients = await this.connMac.createQueryBuilder(ClientMac, "client").getMany();
    const varClients = await this.connVar.createQueryBuilder(ClientVar, "client").getMany();

    return {
      macapaClients: macClients,
      varejaoClients: varClients,
    };
  }

  // get by name Macapá
  public async getByName(name: string): Promise<ClientMac | ClientVar> {
    if (name === "macapa") {
      return await this.connMac
        .createQueryBuilder(ClientMac, "client")
        .addSelect("client.password")
        .where({ name: name })
        .getOne();
    } else if (name === "varejao") {
      return await this.connVar
        .createQueryBuilder(ClientVar, "client")
        .addSelect("client.password")
        .where({ name: name })
        .getOne();
    }
  }
}
