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
  Session,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serializer-interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGaurd } from 'src/guards/auth.guard';
@UseGuards(AuthGaurd)
@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/whoAmI')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;                                  
  }
  @Post('/logIn')
  async LogIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.logIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @Get('/all')
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async findUser(@Param('id') id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('] not found');
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
