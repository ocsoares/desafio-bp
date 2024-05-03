import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class CreateProductDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly brand: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^\d{14}$/, {
        message: "cnpj must be a cnpj without punctuation",
    })
    readonly cnpj: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;
}
