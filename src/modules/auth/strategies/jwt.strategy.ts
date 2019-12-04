import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { secretOrPrivateKey } from '../secretOrPrivateKey';
import { JwtPayload } from '../auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretOrPrivateKey,
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    console.log('payload:', payload);
  }
}
