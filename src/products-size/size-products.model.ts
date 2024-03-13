import {Model, Table, Column, DataType, ForeignKey} from 'sequelize-typescript'
import { Size } from './size.model';
import { Product } from 'src/products/products.model';


@Table({
    tableName: 'size-products',
    createdAt: false,
    updatedAt: false,
})
export class SizeProducts extends Model<SizeProducts> {

    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ForeignKey(() => Size)
    @Column({
        type: DataType.INTEGER,
    })
    sizeId: number

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
    })
    productId: number

}