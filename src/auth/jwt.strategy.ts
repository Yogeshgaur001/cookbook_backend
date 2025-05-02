// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'JWT_SECRET', // Replace with process.env.JWT_SECRET in production
    });
  }

  async validate(payload: any) {
    // Inject into req.user
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
