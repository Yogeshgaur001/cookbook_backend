/*import {
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
import { UseGuards, Get, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
  @UseGuards(JwtAuthGuard)
@Get('mine')
async getMyRecipes(@Req() req) {
  // Assuming your Recipe entity has a userId field
  return this.recipesService.findByUser(req.user.userId);
}
}*/


import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  // ✅ Create a recipe (auth required)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createRecipe(@Req() req, @Body() dto: CreateRecipeDto) {
    return this.recipesService.create(req.user.userId, dto);
  }

  // ✅ Get all recipes created by the logged-in user
  @UseGuards(JwtAuthGuard)
  @Get('mine')
  async getMyRecipes(@Req() req) {
    return this.recipesService.findAllForUser(req.user.userId);
  }

    // ...existing code...

@Get()
async getAllRecipes() {
  return this.recipesService.findAll();
}

}

