import { IsLongitude, IsLatitude, IsEmail, IsString, IsNumber, Min, Max } from 'class-validator';

export class createReport {
  @IsNumber()
  @Min(0)
  @Max(100000)
  prize: number;

  @IsString()
  make: string;

  @IsString()
  modal: string;

  @IsNumber()
  @Min(1950)
  @Max(2050)
  year: number;

  @IsLongitude()
  long: string;

  @IsLatitude()
  lat: string;

  @IsNumber()
  @Min(0)
  @Max(100000)
  milage: number;
}