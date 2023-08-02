import { Body, Controller, Delete, Get, Patch, Param, Post, Query} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { Serilize } from "../interceptor/serilize.interceptor";
import { UserDto } from './dtos/user.dto';

@Controller("auth")
@Serilize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService){}

  @Post("/signup")
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;

    this.usersService.create(email, password);
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
