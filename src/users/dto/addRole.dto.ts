import { ApiProperty } from "@nestjs/swagger";

export class addRoleDto {

    @ApiProperty({example: 'ADMIN', description: 'Присуждаемая роль'})
    readonly role: string;

    @ApiProperty({example: '3301', description: 'ID пользователя которому присуждается роль'})
    readonly userId: number;
}