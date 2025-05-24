import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { Favorite } from './entities/favorite.entity';
import { User } from '../auth/entities/user.entity';
import { Recipe } from '../recipes/entities/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User, Recipe])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}