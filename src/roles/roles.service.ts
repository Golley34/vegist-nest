import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/createRole.dto';

@Injectable()
export class RolesService {

    constructor(
        @InjectModel(Role)
        private roleModel: typeof Role,
    ) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleModel.create(dto)
        return role;
    }

    async getRoles(roles: string) {
        const role = await this.roleModel.findOne({where: {roles}})
        return role;
    }

}
