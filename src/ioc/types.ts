export const TYPES = {
  // services
  TypeOrmService: Symbol("TypeOrmService"),
  JwtMiddleware: Symbol("JwtMiddleware"),
  Validator: Symbol("Validator"),
  Auth: Symbol("Auth"),

  // repositories
  ClientRepository: Symbol("ClientRepository"),
  ContactRepository: Symbol("ContactRepository"),

  // services
  ClientService: Symbol("ClientService"),
  ContactService: Symbol("ContactService"),
  AuthService: Symbol("AuthService"),

  // controllers
  ClientController: Symbol("ClientController"),
  ContactController: Symbol("ContactController"),
  AuthController: Symbol("AuthController"),
};
