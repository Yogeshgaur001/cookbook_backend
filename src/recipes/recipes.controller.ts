import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) // ✅ protect with JWT
  async createRecipe(@Request() req, @Body() dto: CreateRecipeDto) {
    // req.user is injected by JWT Strategy
    return this.recipesService.create(req.user.userId, dto);
  }
}
