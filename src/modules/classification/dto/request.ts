import { ApiProperty } from "@nestjs/swagger"
import { IsEthereumAddress, IsString } from "class-validator"

export class GetClassificationDto {
    @ApiProperty()
    @IsString()
    network: string
    @ApiProperty()
    @IsString()
    @IsEthereumAddress()
    wallet: string
}