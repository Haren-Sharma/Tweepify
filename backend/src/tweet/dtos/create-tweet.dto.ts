import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  image?: string;
  
  @IsOptional()
  @IsNumber()
  impression?: number;
}
