import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { TweetRepository } from 'src/database/repositories/tweet.repo';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/Guards/auth.guard';

@Module({
  imports:[AuthModule],
  controllers: [TweetController],
  providers: [TweetService,TweetRepository,AuthGuard],
})
export class TweetModule {}
