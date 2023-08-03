import { Body, Controller, Delete, Get, Patch, Param, Post, Query, Session, UseGuards} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { Serilize } from "../interceptor/serilize.interceptor";
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from "./user.entity";
import { AuthGuard } from 'src/guards/auth.guard';

@Controller("auth")
@Serilize(UserDto)

export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService){}

  @Get("/colors/:color?")
  setColor(@Param("color") color: string, @Session() session: any) {
    if (color) {
      session.color = color;
    } else {
      return session.color;
    }

  }

  @Get("/whoami")
  @UseGuards(AuthGuard)
  whoami(@CurrentUser() user: User) {
    return user;
  }

  @Post("/signup")
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const { email, password } = body;

    const user = await this.authService.signup(email, password);
    session.user = user.data;
    if (user.success) {
      session.user = user.data;
      return user.data;
    } else {
      return user.ex
    }
  }

  @Post("/signin")
  async signinUser(@Body() body: CreateUserDto, @Session() session: any) {
    const { email, password } = body;

    const signin = await this.authService.signin(email, password);
    if (signin.success) {
      session.user = signin.data;
      return signin.data;
    } else {
      return signin.ex
    }
  }

  @Post("/signout")
  signoutUser(@Session() session: any) {
    session.user = null;
  }

  //@UseInterceptors(new SerilizeInterceptor(UserDto))

  @Get("/user/:id")
  getUser(@Param() param: any) {
    return this.usersService.findOne(param);
  }

  @Get("/user")
  getUserByEmail(@Query("email") email: any) {
    return this.usersService.find({email: email});
  }

  @Patch("/user/:id")
  updateuser(@Body() body: UpdateUserDto, @Param() param: any) {
    const { id } = param;
    return this.usersService.update(parseInt(id), body);
  }

  @Delete("/user/:id")
  deleteUser(@Param("id") id: any) {
    return this.usersService.remove(id);
  }

}
