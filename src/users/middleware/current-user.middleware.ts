import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "../users.service";
import { User } from "../user.entity";

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {

  constructor(private userService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { user } = req.session || {};

    if (user && user.id){
      const userData = await this.userService.findOne(user.id);
      req.currentUser = userData;
    }

    next();
  }
}