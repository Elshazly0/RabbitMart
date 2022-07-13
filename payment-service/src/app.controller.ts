import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.appService.handleCron();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/payment')
  payment() {
    return this.appService.payment(3005);
  }
}
