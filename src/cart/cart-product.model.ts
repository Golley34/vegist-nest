import { ApiProperty } from '@nestjs/swagger';
import {Model, Table, Column, PrimaryKey, DataType, NotNull, BelongsToMany, ForeignKey} from 'sequelize-typescript'
import { Product } from 'src/products/products.model';
import { Cart } from './cart.model';


@Table({
    tableName: 'cart_product',
    createdAt: false,
    updatedAt: false,
})
export class CartProduct extends Model<CartProduct> {

    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
    })
    productId: number

    @ForeignKey(() => Cart)
    @Column({
        type: DataType.INTEGER,
    })
    cartId: number

}