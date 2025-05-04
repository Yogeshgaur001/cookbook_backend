// src/auth/auth.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { access_token } = await this.authService.login(loginDto);

    // Set the token as an HttpOnly cookie
    res.cookie('token', access_token, {
      httpOnly: false, // Allow access via JavaScript
      sameSite: 'lax', // Adjust based on your requirements
      maxAge: 3600000, // 1 hour
    });

    return { message: 'Login successful' };
  }
}
