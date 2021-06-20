import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  website?: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  contactPerson: string;

  @IsLongitude()
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsLatitude()
  @IsNumber()
  @IsNotEmpty()
  latitude: number;
}

export class LocationParamDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class DistanceQueryDto {
  @IsNotEmpty()
  @IsString()
  locationA: string;

  @IsNotEmpty()
  @IsString()
  locationB: string;
}

export class UpdateLocationDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsOptional()
  contactPerson: string;

  @IsLongitude()
  @IsNumber()
  @IsOptional()
  longitude: number;

  @IsLatitude()
  @IsNumber()
  @IsOptional()
  latitude: number;
}
