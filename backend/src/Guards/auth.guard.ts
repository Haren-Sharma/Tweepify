import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenService } from 'src/auth/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(req);
      if (!token)
        throw new UnauthorizedException('Token Not Present In Headers');
      const authToken = await this.jwtService.verifyAsync(token, {
        secret: '123456',
      });
      const apiToken = await this.tokenService.findOneById(authToken?.tokenId);
      if (!apiToken) throw new UnauthorizedException('Token Not Found');
      if (!apiToken.valid || apiToken.expiration < new Date())
        throw new UnauthorizedException('Token Not Valid');
      req.user = apiToken.user;
      return true;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
  extractTokenFromHeader(req: Request) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return token ?? null;
  }
}
