import {
    Controller,
    UseGuards,
    Post,
    Get,
    Delete,
    Request,
    Param,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { FavoritesService } from './favorites.service';
  
  @UseGuards(AuthGuard('jwt'))
  @Controller('favorites')
  export class FavoritesController {
    constructor(private readonly service: FavoritesService) {}
  
    @Post(':recipeId')
    add(@Request() req, @Param('recipeId') recipeId: number) {
      return this.service.addFavorite(req.user.userId, recipeId);
    }
  
    @Get()
    getAll(@Request() req) {
      return this.service.getFavorites(req.user.userId);
    }
  
    @Delete(':recipeId')
    remove(@Request() req, @Param('recipeId') recipeId: number) {
      return this.service.removeFavorite(req.user.userId, recipeId);
    }
  }
  