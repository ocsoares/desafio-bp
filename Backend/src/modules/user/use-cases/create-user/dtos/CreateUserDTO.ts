import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { IsCPF } from "class-validator-cpf";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    readonly fullName: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @IsCPF()
    readonly cpf: string;

    @IsNotEmpty()
    @IsString()
    @Length(7, 120)
    readonly password: string;
}
