import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceModule } from './modules/service/service.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
