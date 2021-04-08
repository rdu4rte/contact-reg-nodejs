import * as fs from "fs";
import { createConnections, getConnection, InsertResult } from "typeorm";
import { config1, config2 } from "./services/typeorm.service";
import { ContactMac } from "./modules/contact/entity/contact-mac.entity";
import { ContactVar } from "./modules/contact/entity/contact-var.entity";
import Logger from "./config/logger.config";

const logger = Logger;

// connect to dbs
const connectDbs = async () => {
  await createConnections([config1, config2]).then(() => {
    logger.info("[MySQL/PostgreSQL] Databases connected");
  });
  console.log(config1.entities, config2.entities);
};

connectDbs();

const msqlContacts = JSON.parse(fs.readFileSync("dataseed/contacts-macapa.json", "utf-8"));
const pgContacts = JSON.parse(fs.readFileSync("dataseed/contacts-varejao.json", "utf-8"));

const importData = async () => {
  try {
    logger.verbose("Seeding data...");

    await getConnection("macapa")
      .createQueryBuilder(ContactMac, "contact_mac")
      .insert()
      .into(ContactMac)
      .values(msqlContacts)
      .execute()
      .then((value: InsertResult) => {
        logger.info(value);
      });

    await getConnection("varejao")
      .createQueryBuilder(ContactVar, "contact_var")
      .insert()
      .into(ContactVar)
      .values(pgContacts)
      .execute()
      .then((value: InsertResult) => {
        logger.info(value);
      });

    console.log("Data successfully seeded!");
    process.exit();
  } catch (err) {
    logger.error(err);
  }
};

const deleteData = async () => {
  try {
    logger.verbose("Deleting data...");
    await getConnection("macapa").createQueryBuilder().delete().from(ContactMac).execute();
    await getConnection("varejao").createQueryBuilder().delete().from(ContactVar).execute();
    logger.verbose("Data deleted!");
    process.exit();
  } catch (err) {
    logger.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
