import { IsLongitude, IsLatitude, IsString, IsNumber, Min, Max, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimate {
  @IsString()
  make: string;

  @IsString()
  modal: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1950)
  @Max(2050)
  year: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  long: string;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(100000)
  milage: number;
}