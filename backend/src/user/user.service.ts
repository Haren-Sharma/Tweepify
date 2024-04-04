import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserRepository } from 'src/database/repositories/user.repo';

@Injectable()
export class UserService {
  constructor(private userRepo:UserRepository) {}
  async createUser(data: CreateUserDto) {
    const { email, username } = data;
    try {
      const [existingUserWithEmail, existingUserWithUsername] =
        await Promise.all([
          !email ? null : this.userRepo.findOne({ where: { email } }),
          !username ? null : this.userRepo.find({ where: { username } }),
        ]);
      console.log(existingUserWithEmail, existingUserWithUsername);
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

  async getOneByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    return user;
  }

  async getOne(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['tweets'],
    });
    if (!user) throw new NotFoundException('User Doesnot Exsist');
    return user;
  }

  async list() {
    return await this.userRepo.find({
      relations: ['tokens','tweets'],
      select: { tokens: { id: true } },
    });
  }

  async update(id: string, data: UpdateUserDto) {
    let user = await this.getOne(id);
    const newUser = Object.assign(user, data);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async delete(id: string) {
    
    const user = await this.getOne(id);
    try{
      await this.userRepo.delete(id);
    }catch(err){
      console.log(err)
    }
    return `User with id:${id} deleted successfully`;
  }
}
