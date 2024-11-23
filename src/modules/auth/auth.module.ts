// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { UserModule } from '../user/user.module'; // Import UserModule
// import { LocalStrategy } from 'strategies/local.strategy';
// import { JwtStrategy } from 'strategies/jwt.strategy';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     UserModule, // Đảm bảo UserModule được import vào đây
//     PassportModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET'),
//         signOptions: { expiresIn: `${configService.get<string>('JWT_EXPIRES_IN')}` },
//       }),
//     }),
//   ],
//   providers: [AuthService, LocalStrategy, JwtStrategy],
//   exports: [AuthService],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { UserModule } from '../user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '100000000s' },
    }),
  ],
  providers: [ AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}