import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create( createUserDto.username,
      createUserDto.password,
      createUserDto.phoneNumber,
      createUserDto.address,
      createUserDto.avatar,
      createUserDto.name );
  }

  @Patch("/edit/:id")
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

}
