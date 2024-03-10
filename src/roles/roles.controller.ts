import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/createRole.dto';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({summary: 'Создание роли'})
  @ApiResponse({status: 200, type: Role})
  @Post()
  createRole(@Body() userDto: CreateRoleDto) {
    return this.rolesService.createRole(userDto)
  }

  @ApiOperation({summary: 'Получение роли'})
  @ApiResponse({status: 200, type: [Role]})
  @Get('/:role')
  getRoles(@Param('role') role: string) {
    return this.rolesService.getRoles(role)
  }
}

