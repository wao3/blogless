import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const [ USERNAME, PASSWORD ] = 
      [ process.env.BLOGLESS_USERNAME, process.env.BLOGLESS_PASSWORD ];
    if (username === USERNAME && password === PASSWORD) {
      return { username }
    }
    return null;
  }

  async certificate(user: any): Promise<any> {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}