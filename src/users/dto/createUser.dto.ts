import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'mail@gmail.com', description: 'Почтовый адрес'})
    @IsString({message: 'Должен быть строкой'})
    @IsEmail({}, {message: 'Некорректный email'})
    readonly email: string;

    @ApiProperty({example: '3301', description: 'Пароль пользователя'})
    @IsString({message: 'Должен быть строкой'})
    @Length(6, 16, {message: 'Пароль должен быть не короче 6 символов и не длиннее 16'})
    readonly password: string;
}