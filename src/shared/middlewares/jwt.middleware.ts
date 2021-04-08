import { inject, injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import { JsonResult } from "inversify-express-utils/dts/results";
import * as jwt from "jsonwebtoken";
import { jwtSecret } from "../../config/env.config";
import { TYPES } from "../../ioc/types";
import { ClientService } from "../../modules/client/client.service";

@injectable()
export class JwtMiddleware extends BaseMiddleware {
  constructor(@inject(TYPES.ClientService) private clientService: ClientService) {
    super();
  }

  public async handler(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    let token;
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
      token = req.headers.authorization.split(" ")[1];
    }

    try {
      if (!token) {
        res.status(401).json({
          message: "You may need log in to access this page",
        });
        return;
      }

      const decodedToken: any = jwt.verify(token, jwtSecret);
      req.user = await this.clientService.getByName(decodedToken["name"]);

      next();
    } catch (err) {
      res.status(401).json({
        message: err.message,
      });
    }
  }
}
