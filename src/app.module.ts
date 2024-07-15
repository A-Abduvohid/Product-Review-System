import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [AuthModule, UserModule, ProductModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
