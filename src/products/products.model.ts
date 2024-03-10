import { ApiProperty } from '@nestjs/swagger';
import {Model, Table, Column, PrimaryKey, DataType, NotNull, BelongsToMany, HasOne} from 'sequelize-typescript'
import { CartProduct } from 'src/cart/cart-product.model';
import { Cart } from 'src/cart/cart.model';
import { Products_info } from './products_info.model';
import { Size } from 'src/products-size/size.model';
import { SizeProducts } from 'src/products-size/size-products.model';


interface ProductCreationAttributes {
    name: string
    price: number
    categories: string
    image: string
}

@Table({
    tableName: 'Products',
})
export class Product extends Model<Product, ProductCreationAttributes> {

    @ApiProperty({example: '1', description: 'id'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
    id: number

    @ApiProperty({example: 'Fresh apple', description: 'Название продукта'})
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    name: string

    @ApiProperty({example: 75, description: 'Цена продукта'})
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    price: number

    @ApiProperty({example: 'photo_2023-09-27_12-37-16.jpg', description: 'Название хранимого изображения'})
    @Column({
        type: DataType.STRING,
    })
    image: string

    @ApiProperty({example: 'Sea & Fish', description: 'Категория продукта'})
    @Column({
        type: DataType.STRING,
    })
    categories: string

    @BelongsToMany(() => Cart, () => CartProduct)
    carts: Cart[]

    @HasOne(() => Products_info)
    info: Products_info

    @BelongsToMany(() => Size, () => SizeProducts)
    size: Size[]
}