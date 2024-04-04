import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from 'src/database/repositories/token.repo';
import { UserService } from 'src/user/user.service';
import * as nodemailer from 'nodemailer';

const EXPIRATION_EMAIL_TOKEN = 10; //mins
const EXPIRATION_API_TOKEN = 12; //hours
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'harensharma33@gmail.com',
    pass: 'piot oswj snox mebn',
  },
});
@Injectable()
export class AuthService {
  constructor(
    private tokenRepo: TokenRepository,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async sendEmail(to: string, text: string) {
    const mailOptions = {
      from: 'harensharma33@gmail.com', // sender address
      to: to, // list of receivers
      subject: 'Email-Token', // Subject line
      text, // Plain text body
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

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
    await this.sendEmail(email, emailToken);
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
      await this.tokenRepo.save({ ...token, valid: false });

      //genearte jwt token
      const authToken = await this.jwtService.signAsync({
        tokenId: apitoken.id,
        userId: apitoken.user.id,
      });
      return { authToken };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
