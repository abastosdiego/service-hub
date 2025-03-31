import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // Usa a estratégia Local para validar login
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('google-login')
  async googleLogin(@Body('idToken') idToken: string) {
    const user = await this.authService.validateGoogleToken(idToken);
    return this.authService.login(user); // Gera e retorna o JWT
  }
}
