import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({example: 'mail@gmail.com', description: 'Почтовый адрес'})
    readonly email: string;

    @ApiProperty({example: '3301', description: 'Пароль пользователя'})
    readonly password: string;
}