import { ApiProperty } from '@nestjs/swagger';
import {Model, Table, Column, DataType, BelongsToMany} from 'sequelize-typescript'
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttributes {
    roles: string;
}

@Table({
    tableName: 'roles',
})
export class Role extends Model<Role, RoleCreationAttributes> {

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
        allowNull: false,
    })
    roles: string

    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}