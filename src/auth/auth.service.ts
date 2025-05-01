// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existingUser) throw new UnauthorizedException('Email already registered');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ email: dto.email, password: hashedPassword });
    await this.userRepo.save(user);
    return { message: 'User registered successfully' };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { access_token: token };
  }
}
