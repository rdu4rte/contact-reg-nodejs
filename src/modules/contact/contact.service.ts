import { Validator } from "./../../shared/utils/validator.utils";
import { inject, injectable } from "inversify";
import { TYPES } from "../../ioc/types";
import { ContactRepository } from "./contact.repository";
import { ContactDTO } from "./dto/contact.dto";
import { ContactMac } from "./entity/contact-mac.entity";
import { ContactVar } from "./entity/contact-var.entity";
import { ClientVar } from "../client/entity/client-var.entity";
import { ClientMac } from "../client/entity/client-mac.entity";

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
  ): Promise<{ detail: string; contact: ContactDTO }> {
    const result = await this.validator.classValidation(ContactDTO, contactDto).then((validated: ContactDTO) => {
      if (validated) {
        return validated;
      }
    });

    const db = client.name;

    await this.contactRepository.insertOne(db, result);
    return {
      detail: `User registered for DB: ${db === "macapa" ? "MYSQL/MACAPÁ" : "POSTGRESQL/VAREJÂO"}`,
      contact: result,
    };
  }
}
