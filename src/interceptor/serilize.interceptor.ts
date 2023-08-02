import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"
import { plainToClass } from "class-transformer";

interface ClassConstructor {
  new (...args: any[]): {}
}

export function Serilize (dto: ClassConstructor) {
  return UseInterceptors(new SerilizeInterceptor(dto));
}

export class SerilizeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run somthing before request is handled
    console.log("I am running before the handler");
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true
        });
      })
    )
  }
}