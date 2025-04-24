import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeORMConfigService } from './config/typeorm.config.service';
import { AuthModule } from './modules/auth/auth.module';
import { OfferingModule } from './modules/offering/offering.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    OfferingModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
