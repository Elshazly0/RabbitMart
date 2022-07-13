import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from '../config';
import mongoose from 'mongoose';
import { ProductSchema } from './product.model';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(config.MONGO_URL),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
//we will do database and SQS (Consume)
