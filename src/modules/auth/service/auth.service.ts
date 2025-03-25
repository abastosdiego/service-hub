import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserByEmailUseCase } from 'src/modules/user/application/use-case/get.user.by.email.use.case';

@Injectable()
export class AuthService {
  constructor(
    private getUserByEmailUseCase: GetUserByEmailUseCase,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.getUserByEmailUseCase.execute(email);
    if (user && user.getPassword() === password) {
      return { id: user.getId(), email: user.getEmail() };
    }
    return null;
  }
  
  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
