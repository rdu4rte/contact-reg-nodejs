import { injectable } from "inversify";
import { getConnection, InsertResult } from "typeorm";
import { ContactDTO } from "./dto/contact.dto";
import { ContactMac } from "./entity/contact-mac.entity";
import { ContactVar } from "./entity/contact-var.entity";

@injectable()
export class ContactRepository {
  private connMac;
  private connVar;

  constructor() {
    this.connMac = getConnection("macapa");
    this.connVar = getConnection("varejao");
  }

  // insert contact
  public async insertOne(db: string, contactDto: ContactDTO): Promise<any> {
    const { name, countryCode, ddd, cellphone } = contactDto;

    if (db === "macapa") {
      return this.connMac
        .createQueryBuilder()
        .insert()
        .into(ContactMac)
        .values({
          name: name.toUpperCase(),
          cellphone: `+${countryCode} (${ddd}) ${cellphone}`,
        })
        .execute()
        .then((value: InsertResult) => {
          return value;
        });
    } else if (db === "varejao") {
      return this.connVar
        .createQueryBuilder()
        .insert()
        .into(ContactVar)
        .values({
          name: name,
          cellphone: `${countryCode}${ddd}${cellphone}`,
        })
        .execute()
        .then((value: InsertResult) => {
          return value;
        });
    }
  }

  // fetch users
  public async fetchContacts(): Promise<{ macapaContacts: ContactMac[]; varejaoContacts: ContactVar[] }> {
    const macContacts = await this.connMac.createQueryBuilder(ContactMac, "contact").getMany();
    const varContacts = await this.connVar.createQueryBuilder(ContactVar, "contact").getMany();

    return {
      macapaContacts: macContacts,
      varejaoContacts: varContacts,
    };
  }
}
