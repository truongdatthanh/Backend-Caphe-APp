import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';


@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  getHello(): string {
    return this.appService.getHello();
  } 

  @Get( 'google' )
  @UseGuards( AuthGuard( 'google' ) )
  async googleAuth ( @Req() req )
  { 
    return this.appService.googleLogin( req );
  }
  
}
