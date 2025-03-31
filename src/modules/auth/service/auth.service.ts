import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { GetUserByEmailUseCase } from 'src/modules/user/application/use-case/get.user.by.email.use.case';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private getUserByEmailUseCase: GetUserByEmailUseCase,
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

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
