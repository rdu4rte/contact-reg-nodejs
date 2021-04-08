import { JwtMiddleware } from "./../shared/middlewares/jwt.middleware";
import { ContactController } from "./../modules/contact/contact.controller";
import { ContactService } from "./../modules/contact/contact.service";
import { ContactRepository } from "./../modules/contact/contact.repository";
import { AuthService } from "./../modules/auth/auth.service";
import { Auth } from "./../shared/utils/auth.utils";
import { Container } from "inversify";
import { TYPES } from "./types";
import { TypeOrmService } from "./../services/typeorm.service";
import { Validator } from "../shared/utils/validator.utils";
import { ClientRepository } from "./../modules/client/client.repository";
import { ClientService } from "../modules/client/client.service";
import { ClientController } from "../modules/client/client.controller";
import { AuthController } from "../modules/auth/auth.controller";

export class ContainerConfigLoader {
  public static Load(): Container {
    const container = new Container();

    // services
    container.bind<TypeOrmService>(TYPES.TypeOrmService).to(TypeOrmService).inSingletonScope();
    container.bind<JwtMiddleware>(TYPES.JwtMiddleware).to(JwtMiddleware);
    container.bind<Validator>(TYPES.Validator).to(Validator).inSingletonScope();
    container.bind<Auth>(TYPES.Auth).to(Auth).inSingletonScope();

    // repositories
    container.bind<ClientRepository>(TYPES.ClientRepository).to(ClientRepository).inSingletonScope();
    container.bind<ContactRepository>(TYPES.ContactRepository).to(ContactRepository).inSingletonScope();

    // logical services
    container.bind<ClientService>(TYPES.ClientService).to(ClientService).inSingletonScope();
    container.bind<ContactService>(TYPES.ContactService).to(ContactService).inSingletonScope();
    container.bind<AuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();

    // controller
    container.bind<ClientController>(TYPES.ClientController).to(ClientController).inSingletonScope();
    container.bind<ContactController>(TYPES.ContactController).to(ContactController).inSingletonScope();
    container.bind<AuthController>(TYPES.AuthController).to(AuthController).inSingletonScope();

    return container;
  }
}
