import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Recipe } from '../../recipes/entities/recipe.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.favorites)
  user: User;

  @ManyToOne(() => Recipe)
  recipe: Recipe;
}