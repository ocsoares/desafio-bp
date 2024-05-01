import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(7, 120)
    password: string;
}
