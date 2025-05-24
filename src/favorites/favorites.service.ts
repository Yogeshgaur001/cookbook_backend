/*import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Recipe } from '../recipes/entities/recipe.entity';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
     @InjectRepository(Favorite) private favRepo: Repository<Favorite>,
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
}*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../favorites/entities/favorite.entity';
import { User } from '../auth/entities/user.entity';
import { Recipe } from '../recipes/entities/recipe.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite) private favRepo: Repository<Favorite>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Recipe) private recipeRepo: Repository<Recipe>,
  ) {}

  async addFavorite(userId: number, recipeId: number) {
  const user = await this.userRepo.findOne({ where: { id: userId } });
  const recipe = await this.recipeRepo.findOne({ where: { id: recipeId } });
  if (!user) throw new Error('User not found');
  if (!recipe) throw new Error('Recipe not found');
  // Check if already favorited
  const existing = await this.favRepo.findOne({ where: { user: { id: userId }, recipe: { id: recipeId } } });
  if (existing) return { message: 'Already in favorites' };
  const favorite = this.favRepo.create({ user, recipe });
  return this.favRepo.save(favorite);
}

  async getFavorites(userId: number) {
    return this.favRepo.find({
      where: { user: { id: userId } },
      relations: ['recipe'],
    });
  }

  async removeFavorite(userId: number, recipeId: number) {
    const fav = await this.favRepo.findOne({
      where: { user: { id: userId }, recipe: { id: recipeId } },
    });
    if (fav) {
      await this.favRepo.remove(fav);
      return { removed: true };
    }
    return { removed: false };
  }
}
