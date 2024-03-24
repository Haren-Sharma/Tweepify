import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNumber()
  impression: number;
}
