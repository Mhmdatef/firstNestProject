import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serializer-interceptor';
import { AuthService } from './auth.service';
@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signUp(body.email, body.password, body.name);
  }
  @Get('/all')
  findAllUsers() {
    return this.usersService.findAll();
  }
  @Get('/:id')
  async findUser(@Param('id') id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Get()
  findUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: Partial<UpdateUserDto>) {
    return this.usersService.update(parseInt(id), body);
  }
  x;
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
