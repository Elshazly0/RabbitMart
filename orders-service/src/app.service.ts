import * as AWS from 'aws-sdk';
import { config } from '../config';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AwsService {
  private sqs;
  private sns;
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {
    AWS.config.update({
      region: 'us-east-1',
      accessKeyId: config.ACCESS_KEY_ID,
      secretAccessKey: config.SECRET_ACCESS_KEY,
    });
    this.sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
    this.sns = new AWS.SNS({ apiVersion: '2010-03-31' });
  }

  public async emitMessage(message: snsMessage) {
    console.log('aaaaaa2');
    const params = {
      Message: JSON.stringify(message),
      TopicArn: config.SNS_ARN,
    };
    return this.sns.publish(params).promise();
  }

  public async createOrder(newOrder) {
    const shipmentorderr = {
      shipmentid: newOrder['shipmentid'],
      id: newOrder['id'],
      price: newOrder['price'],
      quantity: newOrder['quantity'],
      CardName: newOrder['CardName'],
      CardNumber: newOrder['CardNumber'],
      ExpirationDate: newOrder['ExpirationDate'],
      Email: newOrder['Email'],
    };
    const orderr = {
      id: newOrder['id'],
      price: newOrder['price'],
      quantity: newOrder['quantity'],
      CardName: newOrder['CardName'],
      CardNumber: newOrder['CardNumber'],
      ExpirationDate: newOrder['ExpirationDate'],
    };
    const order = await new this.orderModel(orderr);

    const params = {
      Message: JSON.stringify(shipmentorderr),
      TopicArn: config.SNS_ARN,
    };
    this.sns.publish(params).promise();

    return order.save();
  }
}

interface snsMessage {
  header: any;
  body: any;
}
