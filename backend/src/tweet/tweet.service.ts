import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTweetDto } from './dtos/create-tweet.dto';
import { TweetRepository } from 'src/database/repositories/tweet.repo';

@Injectable()
export class TweetService {
  constructor(private tweetRepo:TweetRepository) {}
  async createTweet(data: CreateTweetDto) {
    const { userId, content, image } = data;
    const tweet = this.tweetRepo.create({
      content,
      image,
      user: { id: userId },
    });
    await this.tweetRepo.save(tweet);
    return tweet;
  }

  async getOne(id: string) {
    const tweet = await this.tweetRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!tweet) throw new NotFoundException('Doesnot Exsist');
    return tweet;
  }

  async list() {
    return await this.tweetRepo.find({
      relations: ['user'],
      select: {
        user: { id: true, name: true, username: true, image: true },
      },
    });
  }

  async delete(id: string) {
    const tweet = await this.getOne(id);
    await this.tweetRepo.delete(id);
    return `Tweet with id:${id} deleted successfully`;
  }
}
