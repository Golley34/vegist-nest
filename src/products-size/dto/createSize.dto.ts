import { ApiProperty } from "@nestjs/swagger";

export class CreateSizeDto {

    @ApiProperty({example: '5KG', description: 'Вес'})
    readonly size: string;

}