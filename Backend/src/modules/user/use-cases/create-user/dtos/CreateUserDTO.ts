import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { IsCPF } from "class-validator-cpf";

export class CreateUserDTO {
    @ApiProperty({ type: "string", example: "John Doe" })
    @IsNotEmpty()
    @IsString()
    readonly fullName: string;

    @ApiProperty({ type: "string", example: "example@gmail.com" })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        type: "string",
        example: "47358325052",
        examples: ["473.583.250-52", "47358325052"],
    })
    @IsNotEmpty()
    @IsString()
    @IsCPF()
    readonly cpf: string;

    @ApiProperty({ type: "string", example: "johndoe123" })
    @IsNotEmpty()
    @IsString()
    @Length(7, 120)
    readonly password: string;
}
