import { IsNotEmpty, IsNumber, IsNumberString, IsString, Length } from "class-validator";
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
    description: "Country Code",
    required: true,
  })
  @IsNotEmpty()
  @IsNumberString()
  @Length(2)
  countryCode: number;

  @ApiModelProperty({
    description: "DDD",
    required: true,
  })
  @IsNotEmpty()
  @IsNumberString()
  @Length(2)
  ddd: number;

  @ApiModelProperty({
    description: "Number",
    required: true,
  })
  @IsNotEmpty()
  @IsNumberString()
  cellphone: string;
}
