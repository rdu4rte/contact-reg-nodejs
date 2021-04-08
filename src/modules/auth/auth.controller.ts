import { inject } from "inversify";
import { BaseHttpController, controller, httpPost } from "inversify-express-utils";
import { TYPES } from "../../ioc/types";
import { AuthService } from "./auth.service";
import { ApiOperationPost, ApiPath } from "swagger-express-ts";
import { Request, Response, NextFunction } from "express";
import { JsonResult } from "inversify-express-utils/dts/results";

@ApiPath({
  path: "/auth",
  name: "Authentication",
})
@controller("/api/v1/auth")
export class AuthController extends BaseHttpController {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {
    super();
  }

  @ApiOperationPost({
    description: "Login",
    path: "/signin",
    parameters: {
      body: {
        description: "Login Credentials",
        model: "CredentialsDTO",
        required: true,
      },
    },
    responses: {
      202: { description: "User Logged In" },
      500: { description: "Internal Server Error" },
    },
  })
  @httpPost("/signin")
  public async signin(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const results = await this.authService.signin(req.body);
      return this.json(results, 202);
    } catch (err) {
      return this.json({
        statusCode: 500,
        message: `Internal Server Error: ${err.message}`,
      });
    }
  }
}
