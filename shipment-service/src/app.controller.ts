import { Controller, Get, Param } from '@nestjs/common';
import { EventListeners } from 'aws-sdk';
import { receiveMessageOnPort } from 'worker_threads';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.appService.handleCron();
  }

  @Get(':OrderId')
  GetProduct(@Param('OrderId') OrderId: string): any {
    return this.appService.GetShipment(OrderId);
  }
}
