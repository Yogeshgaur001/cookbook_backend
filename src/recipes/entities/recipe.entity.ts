import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  thumbnail: string;

  @Column('text')
  instructions: string;

  @Column()
  ingredients: string;

  @CreateDateColumn()
  postedAt: Date;

  @ManyToOne(() => User, user => user.recipes)
  postedBy: User;
}
