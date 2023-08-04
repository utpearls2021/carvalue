import { Expose, Transform } from "class-transformer";
import { User } from "../../users/user.entity"

export class ReportDto {
  @Expose()
  id: number

  @Expose()
  prize: number;

  @Expose()
  make: string;

  @Expose()
  modal: string;

  @Expose()
  year: number;

  @Expose()
  long: string;

  @Expose()
  lat: string;

  @Expose()
  milage: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number

  @Expose()
  approved: boolean

}