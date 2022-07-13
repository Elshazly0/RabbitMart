//
import * as AWS from 'aws-sdk';
import { Injectable, Logger } from '@nestjs/common';
import { config } from '../config';
import { Cron, CronExpression } from '@nestjs/schedule';
const { Consumer } = require('sqs-consumer');
import { Shipment, ShipmentDocument } from './Shipment.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class AppService {
  params = {
    QueueUrl: config.TEST_QUEUE_URL,
  };
  private sqs;
  private sns;
  constructor(
    @InjectModel('Shipment') private ShipmentModel: Model<ShipmentDocument>,
  ) {
    AWS.config.update({
      region: 'us-east-1',
      accessKeyId: config.ACCESS_KEY_ID,
      secretAccessKey: config.SECRET_ACCESS_KEY,
    });
    this.sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
    this.sns = new AWS.SNS({ apiVersion: '2010-03-31' });
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.HandleCreatingOrder();
  }

  HandleCreatingOrder() {
    Consumer.create({
      queueUrl: config.TEST_QUEUE_URL,
      handleMessage: async (message) => {
        var params = {
          Entries: [
            {
              Id: message.MessageId,
              ReceiptHandle: message.ReceiptHandle,
            },
          ],
          QueueUrl: config.TEST_QUEUE_URL,
        };
        const order = JSON.parse(JSON.parse(message.Body)['Message']);

        console.log(order);
        const orderr = await new this.ShipmentModel({
          id: order['shipmentid'],
          price: order['price'],
          quantity: order['quantity'],
          ShipmentStatus: 'created',
        });
        orderr.save();

        this.sqs.deleteMessageBatch(params, function (err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else console.log(order); // successful response
        });
      },
    }).start();
  }

  async GetShipment(OrderId: string): Promise<ShipmentDocument> {
    return this.ShipmentModel.findOne({ id: OrderId }).exec();
  }
}
interface snsMessage {
  header: any;
  body: any;
}
