import { IsNotEmpty, IsNumberString, IsString, Length, MaxLength, MinLength } from "class-validator";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  name: "ContactDTO",
})
export class ContactDTO {
  @ApiModelProperty({
    description: "Name",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiModelProperty({
    description: "Number",
    required: true,
  })
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(8)
  @MaxLength(13)
  cellphone: string;
}
