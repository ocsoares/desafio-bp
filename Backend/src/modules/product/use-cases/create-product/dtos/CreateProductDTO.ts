import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class CreateProductDTO {
    @ApiProperty({ type: "string", example: "Chocolate" })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({ type: "string", example: "Lacta" })
    @IsNotEmpty()
    @IsString()
    readonly brand: string;

    @ApiProperty({ type: "string", example: "74185522000141" })
    @IsNotEmpty()
    @IsString()
    @Matches(/^\d{14}$/, {
        message: "cnpj must be a cnpj without punctuation",
    })
    readonly cnpj: string;

    @ApiProperty({ type: "number", example: 12.79 })
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;
}
