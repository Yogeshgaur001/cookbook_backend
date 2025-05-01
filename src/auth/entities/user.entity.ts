import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Recipe } from '../../recipes/entities/recipe.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Recipe, recipe => recipe.postedBy)
  recipes: Recipe[];

  @ManyToMany(() => Recipe)
  @JoinTable()
  favorites: Recipe[];
}
