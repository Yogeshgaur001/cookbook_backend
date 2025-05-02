import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity'; // ✅ Adjust path if needed
import { Recipe } from '../recipes/entities/recipe.entity'; // ✅ Adjust path if needed

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Recipe]) // ✅ This line is critical
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
