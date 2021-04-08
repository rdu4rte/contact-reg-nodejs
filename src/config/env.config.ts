import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const nodeEnv: string = process.env.NODE_ENV;
export const port: number = +process.env.PORT || +process.env.CUSTOM_PORT;

// db
export const pgHost: string = process.env.POSTGRES_HOST;
export const pgPort: number = +process.env.POSTGRES_PORT;
export const pgUser: string = process.env.POSTGRES_USERNAME;
export const pgPass: string = process.env.POSTGRES_PASSWORD;
export const pgDb: string = process.env.POSTGRES_DATABASE;

export const msqlHost: string = process.env.MYSQL_HOST;
export const msqlPort: number = +process.env.MYSQL_PORT;
export const msqlUser: string = process.env.MYSQL_USERNAME;
export const msqlPass: string = process.env.MYSQL_PASSWORD;
export const msqlDb: string = process.env.MYSQL_DATABASE;

// jwt
export const jwtSecret: string = process.env.JWT_SECRET;
export const jwtExpires: number = +process.env.JWT_EXPIRESIN;

// argon salt
export const argonSalt: number = +process.env.SALT;
