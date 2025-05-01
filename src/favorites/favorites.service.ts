import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Recipe } from '../recipes/entities/recipe.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Recipe) private recipeRepo: Repository<Recipe>,
  ) {}

  async addFavorite(userId: number, recipeId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) throw new NotFoundException('User not found');

    const recipe = await this.recipeRepo.findOne({ where: { id: recipeId } });

    if (!recipe) throw new NotFoundException('Recipe not found.');

    user.favorites.push(recipe);
    await this.userRepo.save(user);
    return { message: 'Added to favorites' };
  }

  async getFavorites(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) throw new NotFoundException('User not found');

    return user.favorites;
  }

  async removeFavorite(userId: number, recipeId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) throw new NotFoundException('User not found');

    user.favorites = user.favorites.filter((r) => r.id !== recipeId);
    await this.userRepo.save(user);
    return { message: 'Removed from favorites' };
  }
}
