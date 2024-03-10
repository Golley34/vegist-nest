import { ApiProperty } from "@nestjs/swagger";

export class CreateProductsDto {

    @ApiProperty({example: 'Fresh apple', description: 'Название продукта'})
    readonly name: string;

    @ApiProperty({example: 75, description: 'Цена продукта'})
    readonly price: number;

    @ApiProperty({example: 'Sea & Fish', description: 'Категория продукта'})
    readonly categories: string;

    @ApiProperty({example: '5 Kg', description: 'Вес продукта'})
    readonly size: string[];

    @ApiProperty({example: "Данный продукт выращивают...", description: 'Более детально о продукте'})
    readonly more_detail: string;

}
