import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import { TweetRepository } from 'src/database/repositories/tweet.repo';

@Module({
  controllers: [TweetController],
  providers: [TweetService,TweetRepository],
})
export class TweetModule {}
