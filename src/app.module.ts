import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { CartModule } from './modules/cart/cart.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { GoogleStrategy } from 'strategies/google.strategy';
import { PurchasedModule } from './modules/purchased/purchased.module';
import { VnpayModule } from './vnpay/vnpay.module';


@Module({
  imports: [

    ProductModule,
    CategoryModule,
    CartModule,
    UserModule,
    AuthModule,
    PurchasedModule,
    VnpayModule,
    
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),   
  ],
  
  
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],

})


export class AppModule {
  
}
