import { ApiProperty } from '@nestjs/swagger';
import {Model, Table, Column, DataType, BelongsToMany, HasOne} from 'sequelize-typescript'
import { Cart } from 'src/cart/cart.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttributes {
    email: string;
    password: string;
}

@Table({
    tableName: 'users',
})
export class User extends Model<User, UserCreationAttributes> {

    @ApiProperty({example: '1', description: 'id'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
    id: number

    @ApiProperty({example: 'mail@gmail.com', description: 'Почтовый адрес'})
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string

    @ApiProperty({example: '3301', description: 'Пароль пользователя'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasOne(() => Cart)
    cart: Cart
}