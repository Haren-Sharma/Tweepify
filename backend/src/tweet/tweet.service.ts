import { Injectable, NotFoundException } from '@nestjs/common';
import { Tweet } from 'src/database/entities/tweet.entity';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TweetService {
  constructor(@InjectRepository(Tweet) private tweetRepo: Repository<Tweet>) {}
  async createTweet(data: CreateTweetDto) {
    const tweet = this.tweetRepo.create(data);
    await this.tweetRepo.save(tweet);
    return tweet;
  }

  async getOne(id: string) {
    const tweet = await this.tweetRepo.findOne({ where: { id } });
    if (!tweet) throw new NotFoundException('User Doesnot Exsist');
    return tweet;
  }

  async list() {
    return await this.tweetRepo.find({});
  }

  async delete(id: string) {
    const tweet = await this.getOne(id);
    await this.tweetRepo.delete(id);
    return `Tweet with id:${id} deleted successfully`;
  }
}
