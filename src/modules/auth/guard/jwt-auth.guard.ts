import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUserService } from '../service/currenty.user.service';
import { GetUserByIdUseCase } from 'src/modules/user/application/use-case/get.user.by.id.use.case';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly currentUserService: CurrentUserService,
    private readonly getUserByIdUseCase: GetUserByIdUseCase        
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info:any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    const storedUser = this.getUserByIdUseCase.execute(user.id);
    this.currentUserService.setUser(storedUser);
    return user;
  }
}