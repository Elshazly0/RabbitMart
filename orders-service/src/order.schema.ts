import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  CardName: string;

  @Prop({ required: true })
  CardNumber: string;

  @Prop({ required: true })
  ExpirationDate: Date;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
