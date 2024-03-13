import { ApiProperty } from "@nestjs/swagger";

export class ProductAtCartDto {

    @ApiProperty({example: 'eyJhbGciOi.JIUzI1NiIsInR5cCI6.IkpXVCJ9', description: 'JWT'})
    readonly token: string;

    @ApiProperty({example: 3, description: 'id продукта'})
    readonly productId: number;

}