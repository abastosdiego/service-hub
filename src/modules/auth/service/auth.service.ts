import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { CreateUserUseCase } from 'src/modules/user/application/use-case/create.user.use.case';
import { GetUserByEmailUseCase } from 'src/modules/user/application/use-case/get.user.by.email.use.case';
import { User } from 'src/modules/user/domain/entity/user.entity';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private getUserByEmailUseCase: GetUserByEmailUseCase,
    private createUserUseCase: CreateUserUseCase,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.googleClient = new OAuth2Client(configService.get<string>('GOOGLE_CLIENT_ID'));
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.getUserByEmailUseCase.execute(email);
    if (user && user.getPassword() === password) {
      return { id: user.getId(), email: user.getEmail() };
    }
    return null;
  }
  
  async validateGoogleToken(idToken: string): Promise<any> {
    try {
      // Verifica o token com o Google
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      });

      const payload = ticket.getPayload();
      if (!payload) {
        throw new UnauthorizedException('Token inválido');
      }

      // Retorna os dados do usuário
      const { sub, email, name } = payload;
      return { id: sub, email, name };
    } catch (error) {
      throw new UnauthorizedException('Falha ao validar o token do Google! ' + error.message);
    }
  }

  async login(userData: { id: string, email: string; name: string }) {
    const user = await this.createUserIfNotExist({ email: userData.email, name: userData.name});
    const payload = { sub: user.getId(), email: user.getEmail(), name: user.getName()};
    return { access_token: this.jwtService.sign(payload) };
  }

  async createUserIfNotExist(userData: { email: string; name: string }): Promise<User> {
    let user = await this.getUserByEmailUseCase.execute(userData.email);
    if (!user) {
      user = await this.createUserUseCase.execute({
        name: userData.name,
        email: userData.email,
        password: undefined,
      });
    }
    return user;
  }
}
