import { BaseHttpController, controller, httpGet, httpPost } from "inversify-express-utils";
import { ApiOperationGet, ApiOperationPost, ApiPath } from "swagger-express-ts";
import { Request, Response, NextFunction } from "express";
import { JsonResult } from "inversify-express-utils/dts/results";
import { inject } from "inversify";
import { TYPES } from "../../ioc/types";
import { ContactService } from "./contact.service";

@ApiPath({
  path: "/contact",
  name: "Contact",
})
@controller("/api/v1/contact")
export class ContactController extends BaseHttpController {
  constructor(@inject(TYPES.ContactService) private contactService: ContactService) {
    super();
  }

  @ApiOperationPost({
    description: "Insert New Contact",
    path: "",
    security: {
      apiKeyHeader: [],
    },
    parameters: {
      body: {
        description: "New Contact",
        model: "ContactDTO",
        required: true,
      },
    },
    responses: {
      201: { description: "Contact Successfully Registered" },
      500: { description: "Failed To Insert Contact" },
    },
  })
  @httpPost("/", TYPES.JwtMiddleware)
  public async registerContact(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const results = await this.contactService.insertContact(req.body, req.user);
      return this.json(results, 201);
    } catch (err) {
      return this.json({
        statusCode: 500,
        message: `Failed to register contact: ${err.message}`,
      });
    }
  }

  @ApiOperationGet({
    description: "Fetch Contacts From Both DBs",
    path: "",
    security: {
      apiKeyHeader: [],
    },
    responses: {
      200: { description: "Fetch Contacts" },
      500: { description: "Failed To Fetch Contacts" },
    },
  })
  @httpGet("/", TYPES.JwtMiddleware)
  public async fetchContacts(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const results = await this.contactService.fetchContacts();
      return this.json(results, 200);
    } catch (err) {
      return this.json({
        statusCode: 500,
        message: `Failed to fetch contacts: ${err.message}`,
      });
    }
  }

  @ApiOperationGet({
    description: "Fetch Contacts From Macapa DB",
    path: "/macapa",
    security: {
      apiKeyHeader: [],
    },
    responses: {
      200: { description: "Fetch Contacts" },
      500: { description: "Failed To Fetch Contacts" },
    },
  })
  @httpGet("/macapa", TYPES.JwtMiddleware)
  public async fetchContactsFromMac(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const results = await this.contactService.fetchFromMac();
      return this.json(results, 200);
    } catch (err) {
      return this.json({
        statusCode: 500,
        message: `Failed to fetch contact: ${err.message}`,
      });
    }
  }

  @ApiOperationGet({
    description: "Fetch Contacts From Macapa DB",
    path: "/varejao",
    security: {
      apiKeyHeader: [],
    },
    responses: {
      200: { description: "Fetch Contacts" },
      500: { description: "Failed To Fetch Contacts" },
    },
  })
  @httpGet("/varejao", TYPES.JwtMiddleware)
  public async fetchContactsFromVar(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const results = await this.contactService.fetchFromVar();
      return this.json(results, 200);
    } catch (err) {
      return this.json({
        statusCode: 500,
        message: `Failed to fetch contact: ${err.message}`,
      });
    }
  }

  @ApiOperationPost({
    description: "Seed DB",
    path: "/seed",
    parameters: {},
    responses: {
      201: { description: "Contact Successfully Seeded" },
      500: { description: "Failed To Seed Contacts" },
    },
  })
  @httpPost("/seed")
  public async seedDb(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const results = await this.contactService.seedDb();
      return this.json(results, 201);
    } catch (err) {
      return this.json({
        statusCode: 500,
        message: `Failed to seed DBs: ${err.message}`,
      });
    }
  }
}
