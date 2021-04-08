import { TYPES } from "./../../ioc/types";
import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, httpPost } from "inversify-express-utils";
import { ClientService } from "./client.service";
import { JsonResult } from "inversify-express-utils/dts/results";
import { NextFunction, Request, Response } from "express";
import { ApiOperationGet, ApiOperationPost, ApiPath } from "swagger-express-ts";

@ApiPath({
  path: "/client",
  name: "Client",
})
@controller("/api/v1/client")
export class ClientController extends BaseHttpController {
  constructor(@inject(TYPES.ClientService) private clientService: ClientService) {
    super();
  }

  @ApiOperationGet({
    description: "Fetch Clients From Both DBs",
    path: "",
    responses: {
      200: { description: "Success" },
      500: { description: "Failed to fetch clients" },
    },
  })
  @httpGet("/")
  public async fetchClients(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const results = await this.clientService.fetchUsers();
      return this.json(results, 200);
    } catch (err) {
      return this.json(`Failed to fetch users: ${err.message}`, 500);
    }
  }

  @ApiOperationPost({
    description: "Auto Generate Clients For Both DBs",
    path: "",
    parameters: {},
    responses: {
      201: { description: "Success" },
      500: { description: "Failed to register clients" },
    },
  })
  @httpPost("/")
  public async generateClients(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const results = await this.clientService.generateClients();
      return this.json(results, 201);
    } catch (err) {
      return this.json(`Failed to register clients or clients are already registered: ${err.message}`, 500);
    }
  }
}
