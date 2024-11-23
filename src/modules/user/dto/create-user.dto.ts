import { Type } from "@nestjs/common";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { Types } from "mongoose";

export class CreateUserDto {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @IsOptional()
    phoneNumber?: string;

    @IsOptional()
    address?: string;

    @IsOptional()
    avatar?: string;

    @IsNotEmpty()
    roleId: Types.ObjectId;
}
