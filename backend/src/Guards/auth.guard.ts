import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);
    if (!token) throw new UnauthorizedException('Token Not Found');
    const tokenId = await this.jwtService.verifyAsync(token, {
      secret: '123456',
    });
    if (!tokenId) throw new UnauthorizedException('Token Expired');
    req.tokenId = tokenId;
    return true;
  }
  extractTokenFromHeader(req: Request) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return token ?? null;
  }
}
