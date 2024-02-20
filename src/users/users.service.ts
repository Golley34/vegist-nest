import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/createUser.dto';
import { RolesService } from 'src/roles/roles.service';
import { addRoleDto } from './dto/addRole.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private roleModel: RolesService,
    ) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userModel.create(dto)
        const role = await this.roleModel.getRoles('USER')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async getUsers() {
        const users = await this.userModel.findAll({include: {all: true}})
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({where: {email}, include: {all: true}})
        return user;
    }

    async addRole(dto: addRoleDto) {
        const user = await this.userModel.findByPk(dto.userId)
        const role = await this.roleModel.getRoles(dto.role)
        if (role && user) {
            await user.$add('roles', role.id)
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }
}
