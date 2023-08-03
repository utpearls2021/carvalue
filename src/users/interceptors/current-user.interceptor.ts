import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { user } = request.session || {};

    if (user && user.id){
      const userData = await this.userService.findOne(user.id);
      request.currentUser = userData;
    }

    return next.handle();
  }
}
