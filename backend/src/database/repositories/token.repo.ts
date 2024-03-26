import { DataSource, Repository } from 'typeorm';
import { Token } from '../entities/token.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenRepository extends Repository<Token> {
  constructor(private datasource: DataSource) {
    super(Token, datasource.createEntityManager());
  }
}
