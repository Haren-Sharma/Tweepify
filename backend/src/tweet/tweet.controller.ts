import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { TweetService } from './tweet.service';
import { AuthGuard } from 'src/Guards/auth.guard';

@Controller('tweet')
@UseGuards(AuthGuard)
export class TweetController {
  constructor(private tweetService: TweetService) {}
  @Post()
  createTweet(@Body() body: CreateTweetDto, @Req() req: any) {
    const { id } = req?.user;
    return this.tweetService.createTweet(body, id);
  }

  @Get('/:id')
  getOneTweetById(@Param('id') id: string) {
    return this.tweetService.getOne(id);
  }

  @Get()
  listAll(@Req() re: any) {
    console.log(re?.user);
    return this.tweetService.list();
  }

  @Delete('/:id')
  deleteTweet(@Param('id') id: string) {
    return this.tweetService.delete(id);
  }
}
