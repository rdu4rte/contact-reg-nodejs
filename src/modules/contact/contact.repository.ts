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
    if (db === "macapa") {
      const entityMac = Object.assign(new ContactMac(), {
        name: contactDto.name,
        cellphone: contactDto.cellphone,
      });

      return this.connMac
        .createQueryBuilder()
        .insert()
        .into(ContactMac)
        .values(entityMac)
        .execute()
        .then((value: InsertResult) => {
          return value;
        });
    } else if (db === "varejao") {
      const entityVar = Object.assign(new ContactVar(), {
        name: contactDto.name,
        cellphone: contactDto.cellphone,
      });

      return this.connVar
        .createQueryBuilder()
        .insert()
        .into(ContactVar)
        .values(entityVar)
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

  // fetch from MySQL
  public async fetchFromMac(): Promise<ContactMac[]> {
    return this.connMac.createQueryBuilder(ContactMac, "contact").getMany();
  }

  // fetch from PostgreSQL
  public async fetchFromVar(): Promise<ContactVar[]> {
    return this.connVar.createQueryBuilder(ContactVar, "contact").getMany();
  }

  // seed db
  public async seedDb(msqlSeed: ContactDTO[], pgSeed: ContactDTO[]): Promise<any> {
    const macapaResults = await this.connMac
      .createQueryBuilder()
      .insert()
      .into(ContactMac)
      .values(msqlSeed)
      .execute()
      .then((value: InsertResult) => {
        return value;
      });

    const varejaoResults = await this.connVar
      .createQueryBuilder()
      .insert()
      .into(ContactVar)
      .values(pgSeed)
      .execute()
      .then((value: InsertResult) => {
        return value;
      });

    return { detail: "Macapá and VareJão seeded" };
  }
}
