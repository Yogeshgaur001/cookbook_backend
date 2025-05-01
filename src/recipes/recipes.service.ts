import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { User } from '../auth/entities/user.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe) private recipeRepo: Repository<Recipe>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(userId: number, dto: CreateRecipeDto): Promise<Recipe> {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const recipe = this.recipeRepo.create({
      ...dto,
      postedBy: user,
    });

    return this.recipeRepo.save(recipe);
  }
}
