import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/database/entities/token.entity';
import { UserModule } from 'src/user/user.module';
import { TokenRepository } from 'src/database/repositories/token.repo';
import { TokenService } from './token.service';

@Module({
  imports:[UserModule],
  controllers: [AuthController],
  providers: [AuthService,TokenRepository,TokenService],
  exports:[TokenService]
})
export class AuthModule {}
