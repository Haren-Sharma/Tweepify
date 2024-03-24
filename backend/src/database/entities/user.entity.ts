import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tweet } from './tweet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({unique:true})
  username: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ default: false })
  isVerified: boolean;
}
