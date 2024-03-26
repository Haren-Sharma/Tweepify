import { DataSource, Repository } from "typeorm";
import { Tweet } from "../entities/tweet.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TweetRepository extends Repository<Tweet>{
    constructor(private datasource:DataSource){
        super(Tweet,datasource.createEntityManager())
    }
}