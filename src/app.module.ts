import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';
import { FavoritesModule } from './favorites/favorites.module';
import { User } from './auth/entities/user.entity';
import { Recipe } from './recipes/entities/recipe.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'yourpassword',
      database: 'cookbook',
      entities: [User, Recipe],
      synchronize: true,
    }),
    AuthModule,
    RecipesModule,
    FavoritesModule,
  ],
})
export class AppModule {}
