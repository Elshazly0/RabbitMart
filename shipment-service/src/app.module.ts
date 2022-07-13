import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from '../config';
import { ShipmentSchema } from './Shipment.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(config.MONGO_URL),
    MongooseModule.forFeature([{ name: 'Shipment', schema: ShipmentSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
