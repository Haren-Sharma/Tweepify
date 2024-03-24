import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { TweetService } from './tweet.service';

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}
  @Post()
  createTweet(@Body() body: CreateTweetDto) {
    return this.tweetService.createTweet(body);
  }

  @Get('/:id')
  getOneTweetById(@Param('id') id: string) {
    return this.tweetService.getOne(id);
  }

  @Get()
  listAll() {
    return this.tweetService.list();
  }

  @Delete('/:id')
  deleteTweet(@Param('id') id: string) {
    return this.tweetService.delete(id);
  }
}
