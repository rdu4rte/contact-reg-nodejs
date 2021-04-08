import { IsNotEmpty, IsString } from "class-validator";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  name: "ClientDTO",
})
export class ClientDTO {
  @ApiModelProperty({
    description: "Client Name",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiModelProperty({
    description: "Client Password",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
