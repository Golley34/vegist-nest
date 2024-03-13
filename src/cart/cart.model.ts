import { ApiProperty } from '@nestjs/swagger';
import {Model, Table, Column, DataType, BelongsToMany, BelongsTo, ForeignKey} from 'sequelize-typescript'
import { Product } from 'src/products/products.model';
import { User } from 'src/users/users.model';
import { CartProduct } from './cart-product.model';

interface CartCreationAttributes {
    
}

@Table({
    tableName: 'Cart',
})
export class Cart extends Model<Cart, CartCreationAttributes> {

    @ApiProperty({example: '1', description: 'id'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
    id: number

    @ApiProperty({example: '1', description: 'id пользователя'})
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    userId: number

    @BelongsTo(() => User)
    user: User

    @BelongsToMany(() => Product, () => CartProduct)
    products: Product[]
}