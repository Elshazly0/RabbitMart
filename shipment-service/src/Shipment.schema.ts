import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShipmentDocument = Shipment & Document;

@Schema()
export class Shipment {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  ShipmentStatus: string;
}
export const ShipmentSchema = SchemaFactory.createForClass(Shipment);
