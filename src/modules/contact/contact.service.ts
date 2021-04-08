import { Validator } from "./../../shared/utils/validator.utils";
import { inject, injectable } from "inversify";
import { TYPES } from "../../ioc/types";
import { ContactRepository } from "./contact.repository";
import { ContactDTO } from "./dto/contact.dto";
import { ContactMac } from "./entity/contact-mac.entity";
import { ContactVar } from "./entity/contact-var.entity";
import { ClientVar } from "../client/entity/client-var.entity";
import { ClientMac } from "../client/entity/client-mac.entity";
import * as fs from "fs";

@injectable()
export class ContactService {
  constructor(
    @inject(TYPES.ContactRepository) private contactRepository: ContactRepository,
    @inject(TYPES.Validator) private validator: Validator,
  ) {}

  // insert contact
  public async insertContact(
    contactDto: ContactDTO,
    client: ClientVar | ClientMac,
  ): Promise<{ detail: string; contact: string }> {
    const result = await this.validator.classValidation(ContactDTO, contactDto).then((validated: ContactDTO) => {
      if (validated) {
        return validated;
      }
    });

    const db = client.name;
    const treated = await this.validator.treatString(db, result);

    await this.contactRepository.insertOne(db, result);
    return {
      detail: `User registered for DB: ${db === "macapa" ? "MYSQL/MACAPÁ" : "POSTGRESQL/VAREJÂO"}`,
      contact: `Usuário: ${result.name}, Telefone: ${treated.cellphone}`,
    };
  }

  // fetch contacts from both DBs
  public async fetchContacts(): Promise<{ macapaContacts: ContactMac[]; varejaoContacts: ContactVar[] }> {
    return await this.contactRepository.fetchContacts();
  }

  // fetch from msql
  public async fetchFromMac(): Promise<ContactMac[]> {
    return this.contactRepository.fetchFromMac();
  }

  // fetch from msql
  public async fetchFromVar(): Promise<ContactVar[]> {
    return this.contactRepository.fetchFromVar();
  }

  // seed db
  public async seedDb(): Promise<any> {
    const msqlContacts = JSON.parse(fs.readFileSync("dataseed/contacts-macapa.json", "utf-8"));
    const pgContacts = JSON.parse(fs.readFileSync("dataseed/contacts-varejao.json", "utf-8"));

    const msqlTreated: ContactDTO[] = [];
    msqlContacts.map((contact: ContactDTO) => {
      const treated = this.validator.treatString("macapa", contact);
      msqlTreated.push({ name: treated.name, cellphone: treated.cellphone });
    });

    return this.contactRepository.seedDb(msqlTreated, pgContacts);
  }
}
