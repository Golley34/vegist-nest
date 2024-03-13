import { ApiProperty } from '@nestjs/swagger';
import {Model, Table, Column, DataType, HasMany, BelongsTo, ForeignKey} from 'sequelize-typescript'
import { Products_info_images } from './products_info_images.model';
import { Product } from './products.model';

interface ProductsInfoCreationAttributes {
    more_detail: string
}

@Table({
    tableName: 'Products_info',
})
export class Products_info extends Model<Products_info, ProductsInfoCreationAttributes> {

    @ApiProperty({example: '1', description: 'id'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
    id: number

    @ApiProperty({example: "Данный продукт выращивают...", description: 'Более детально о продукте'})
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    more_detail: string

    @ApiProperty({example: true, description: 'Наличие продукта в продаже'})
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    availability: boolean

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
    })
    productId: number

    @HasMany(() => Products_info_images)
    images: Products_info_images[]

    @BelongsTo(() => Product)
    product: Product
}