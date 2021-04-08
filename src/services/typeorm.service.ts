import { injectable } from "inversify";
import { ConnectionOptions, createConnections, DatabaseType } from "typeorm";
import { pgHost, pgUser, pgPass, pgDb, msqlHost, msqlUser, msqlPass, msqlDb, nodeEnv } from "../config/env.config";
import Logger from "../config/logger.config";

@injectable()
export class TypeOrmService {
  private logger = Logger;

  public async connection(): Promise<any> {
    const options1: any = config1;
    const options2: any = config2;

    try {
      await createConnections([options1, options2]);
      this.logger.info("[TypeORM] Databases connected");
    } catch (err) {
      this.logger.error(`[TypeORM] Failed to connect: ${err}`);
      process.exit(1);
    }

    return { options1, options2 };
  }
}

// postgres options
export const config1: ConnectionOptions = <ConnectionOptions>{
  name: "varejao",
  type: <DatabaseType>"postgres",
  host: pgHost,
  username: pgUser,
  password: pgPass,
  database: pgDb,
  synchronize: true,
  entities: [__dirname + "../../dist/src/modules/**/entity/*-var.entity.js"],
  seeds: ["databaseed/"],
};

// mysql options
export const config2: ConnectionOptions = <ConnectionOptions>{
  name: "macapa",
  type: <DatabaseType>"mysql",
  host: msqlHost,
  username: msqlUser,
  password: msqlPass,
  database: msqlDb,
  synchronize: true,
  entities: [__dirname + "../../dist/src/modules/**/entity/*-mac.entity.js"],
  seeds: ["databaseed/"],
};
