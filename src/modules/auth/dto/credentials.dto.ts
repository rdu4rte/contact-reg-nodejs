import { IsNotEmpty, IsString } from "class-validator";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  name: "CredentialsDTO",
})
export class CredentialsDTO {
  @ApiModelProperty({
    description: "Username",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiModelProperty({
    description: "Password",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
