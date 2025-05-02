import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  // ✅ POST /recipes - Create recipe
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createRecipe(@Request() req, @Body() dto: CreateRecipeDto) {
    return this.recipesService.create(req.user.userId, dto);
  }

  // ✅ GET /recipes - Get all recipes of logged-in user
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserRecipes(@Request() req) {
    return this.recipesService.findAllForUser(req.user.userId);
  }
}
