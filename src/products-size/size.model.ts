import { ApiProperty } from '@nestjs/swagger';
import {Model, Table, Column, PrimaryKey, DataType, NotNull, BelongsToMany} from 'sequelize-typescript'
import { SizeProducts } from './size-products.model';
import { Product } from 'src/products/products.model';


interface SizeCreationAttributes {
    size: string;
}

@Table({
    tableName: 'size',
})
export class Size extends Model<Size, SizeCreationAttributes> {

    @ApiProperty({example: '1', description: 'id'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
    id: number

    @ApiProperty({example: 'ADMIN', description: 'Роль'})
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    size: string

    @BelongsToMany(() => Product, () => SizeProducts)
    products: Product[]
}