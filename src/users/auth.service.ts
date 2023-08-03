import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService){}

  async signup(email: string, password: string) {
    let result = { success: true, data: null , ex: null};

    try {
      result.data = await this.userService.find({ email: email });
      if (result.data.length) {
        result.ex = "Given email is already registered";
        result.success = false;
      } else {
        // Hash the password
        // Generate salt
        const salt = randomBytes(8).toString("hex");
        // Hash salt and password together
        const hash = (await scrypt(password, salt, 32) as Buffer);
        // join hash result and join togather password
        const hashPassword = salt + "." + hash.toString("hex");
        // create new user and save
        result.data = await this.userService.create(email, hashPassword);
      }
    } catch (ex) {
      result.ex = "Sign up failed";
      result.success = false;
    }

    return result;
  }

  async signin(email: string, password: string) {
    let result: any = { success: true, data: null , ex: null };

    try {
      const [user] = await this.userService.find({ email: email });

      if (user) {
        const [ salt, storedHash ] = user.password.split(".");
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash != hash.toString("hex")) {
          result.ex = "Given email and password not march";
          result.success = false;
        } else {
            result.data = user;
        }

      } else {
        result.ex = "Given email and password not found";
        result.success = false;
      }
    } catch(ex) {
      result.ex = "Signin failed";
      result.success = false;
      result.tx = "er";
    }

    return result;
  }
}