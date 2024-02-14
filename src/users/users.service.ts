import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/createUser.dto';
import { RolesService } from 'src/roles/roles.service';

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
        return user;
    }

    async getUsers() {
        const users = await this.userModel.findAll({include: {all: true}})
        return users;
    }
}
