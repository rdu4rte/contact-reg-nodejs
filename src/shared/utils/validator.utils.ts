import { sanitize } from "class-sanitizer";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { injectable } from "inversify";
import Logger from "../../config/logger.config";
import { ContactDTO } from "../../modules/contact/dto/contact.dto";

@injectable()
export class Validator {
  private logger = Logger;

  // validate classes
  public async classValidation(type: any, dtoFromBody: any): Promise<any> {
    const dtoObj = plainToClass(type, dtoFromBody);

    const results = await validate(dtoObj, { skipMissingProperties: false }).then((err: ValidationError[]) => {
      if (err.length > 0) {
        const dtoErrors = err.map((err: ValidationError) => (Object as any).values(err.constraints)).join(", ");
        this.logger.error(dtoErrors);
        return false;
      } else {
        sanitize(dtoObj);
        dtoFromBody = dtoObj;
        return dtoFromBody;
      }
    });

    return results;
  }

  // treat cellphone string
  public treatString(db: string, contact: ContactDTO): ContactDTO {
    if (db === "varejao") {
      return contact;
    }

    let cellphone;
    if (contact.cellphone.length == 13) {
      const countryCode = contact.cellphone.slice(0, 2);
      const ddd = contact.cellphone.slice(2, 4);
      const phone = contact.cellphone.slice(4, 13);
      const treated = `+${countryCode} (${ddd}) ${phone}`;
      cellphone = treated;
    }

    const name = contact.name.toUpperCase();
    return { name: name, cellphone: cellphone };
  }
}
