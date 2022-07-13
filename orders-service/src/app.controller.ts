import { Order, OrderDocument } from './order.schema';
import {
  Controller,
  Get,
  Param,
  Request,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { AwsService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly awsService: AwsService) {}

  @Post()
  async createOrder(@Body() order: OrderDocument): Promise<any> {
    const orderr = this.awsService.createOrder(order);
  }
}
