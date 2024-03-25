import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async createUser(data: CreateUserDto) {
    try {
      const [existingUserWithEmail, existingUserWithUsername] =
        await Promise.all([
          this.userRepo.findOne({ where: { email: data.email } }),
          this.userRepo.findOne({ where: { username: data.username } }),
        ]);
      if (existingUserWithEmail) {
        throw new Error('Email already in use');
      }
      if (existingUserWithUsername) {
        throw new Error('Username already in use');
      }
      const user = this.userRepo.create(data);
      await this.userRepo.save(user);
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getOne(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User Doesnot Exsist');
    return user;
  }

  async list() {
    return await this.userRepo.find({relations:['tweets'],select:{id:true,username:true,isVerified:true}});
  }

  async update(id: string, data: UpdateUserDto) {
    let user = await this.getOne(id);
    const newUser = Object.assign(user, data);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async delete(id: string) {
    const user = await this.getOne(id);
    await this.userRepo.delete(id);
    return `User with id:${id} deleted successfully`;
  }
}
