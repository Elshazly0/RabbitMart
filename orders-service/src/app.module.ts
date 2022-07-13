import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AwsService } from './app.service';
import { Order, OrderSchema } from './order.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { config } from '../config';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(config.MONGO_URL),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [AppController],
  providers: [AwsService],
})
export class AppModule {}
//here we will do the SNS
