import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail({},{message:'Email should be unique'})
  email: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString({message:"Username should be unique"})
  username?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  bio?: string;
  
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

}
