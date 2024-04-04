import { Injectable } from '@nestjs/common';
import { TokenRepository } from 'src/database/repositories/token.repo';

@Injectable()
export class TokenService {
  constructor(private tokenRepo: TokenRepository) {}
  findOneById(tokenId:string){
    return this.tokenRepo.findOne({where:{id:tokenId},relations:['user']});
  }
}
