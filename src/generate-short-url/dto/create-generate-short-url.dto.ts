import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateGenerateShortUrlDto {

    @ApiProperty({ required: true, example: "768s8asdadkadlatd" })
    @IsOptional()
    @IsString()
    _id : string

    @ApiProperty({ required: true, example: "http://localhost:1000" })
    @IsNotEmpty()
    @IsString()
    long_url : string

    @ApiProperty({ required: true, example: "768s8asdadkadlatd" })
    @IsNotEmpty()
    @IsString()
    conusmer_id : string

    @ApiProperty({ required: true, example: "New-York USA" })
    @IsOptional()
    @IsString()
    location : string
}
