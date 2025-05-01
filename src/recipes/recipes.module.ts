import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { Recipe } from '../recipes/entities/recipe.entity';
import { User } from '../auth/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Recipe, User])],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
