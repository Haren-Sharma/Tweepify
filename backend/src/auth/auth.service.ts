import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/database/entities/token.entity';
import { TokenRepository } from 'src/database/repositories/token.repo';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

const EXPIRATION_EMAIL_TOKEN = 10; //mins
const EXPIRATION_API_TOKEN = 12; //hours

@Injectable()
export class AuthService {
  constructor(
    private tokenRepo:TokenRepository,
    private userService: UserService,
    private jwtService:JwtService,
  ) {}

  async login(email: string, emailToken: string) {
    //check whether email exsists or not
    let user = await this.userService.getOneByEmail(email);
    if (!user) user = await this.userService.createUser({ email });
    const token = this.tokenRepo.create({
      type: 'Email',
      emailToken,
      user: { id: user.id },
      expiration: new Date(
        new Date().getTime() + EXPIRATION_EMAIL_TOKEN * 60 * 1000,
      ),
    });
    await this.tokenRepo.save(token);
    return token;
  }
  /*
    validate the email token,
    generate the jwt token
    */
  async authenticate(email: string, emailToken: string, userId: string) {
    try {
      const token = await this.tokenRepo.findOne({
        where: { emailToken },
        relations: ['user'],
      });
      if (!token) throw new Error('Token Doesnot Exsist');
      if (email !== token?.user?.email) throw new Error('User Mismatch');
      if (!token.valid) throw new Error('Token Invalid');
      if (token.expiration < new Date()) throw new Error('Token expired');
      const apitoken = this.tokenRepo.create({
        type: 'Api',
        expiration: new Date(
          new Date().getTime() + EXPIRATION_API_TOKEN * 60 * 60 * 1000,
        ),
        user: { id: userId },
      });
      await this.tokenRepo.save(apitoken);
      
      //invalidate the email token as well
      await this.tokenRepo.save({...token,valid:false})

      //genearte jwt token
      const jwt=await this.jwtService.signAsync({id:apitoken.id})
      return jwt;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
