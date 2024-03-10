import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {

    @ApiProperty({example: 'ADMIN', description: 'Роль'})
    readonly roles: string;

}