import { ApiProperty } from '@nestjs/swagger';
import {Model, Table, Column, PrimaryKey, DataType, NotNull, BelongsToMany, BelongsTo, ForeignKey} from 'sequelize-typescript'
import { Products_info } from './products_info.model';

interface ProductsInfoImagesCreationAttributes {
    image: string
}

@Table({
    tableName: 'Products_info_images',
})
export class Products_info_images extends Model<Products_info_images, ProductsInfoImagesCreationAttributes> {

    @ApiProperty({example: '1', description: 'id'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
    id: number

    @ApiProperty({example: 'photo_2023-09-27_12-37-16.jpg', description: 'Название хранимого изображения'})
    @Column({
        type: DataType.STRING,
    })
    image: string

    @ForeignKey(() => Products_info)
    @Column({
        type: DataType.INTEGER,
    })
    Products_info_Id: number

    @BelongsTo(() => Products_info)
    products_info: Products_info
}