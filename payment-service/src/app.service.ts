import * as AWS from 'aws-sdk';
import { config } from '../config';
import { InjectModel } from '@nestjs/mongoose';
const { Consumer } = require('sqs-consumer');
import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
require('dotenv').config();

@Injectable()
export class AppService {
  params = {
    QueueUrl: config.TEST_QUEUE_URL,
  };
  private sqs;
  private sns;
  constructor() {
    AWS.config.update({
      region: 'us-east-1',
      accessKeyId: config.ACCESS_KEY_ID,
      secretAccessKey: config.SECRET_ACCESS_KEY,
    });
    this.sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
    this.sns = new AWS.SNS({ apiVersion: '2010-03-31' });
  }

  getHello(): string {
    return 'Hello World!';
  }

  async payment(amount: number) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY1);

    const paymentIntent = await stripe.charges.create(
      {
        amount: amount,
        currency: 'eur',
        source: 'tok_amex',
      },
      {
        stripeAccount: process.env.STRIPE_ACCOUNT_ID1,
      },
    );
    return paymentIntent;
  }

  handleCron() {
    this.consume();
  }

  consume() {
    console.log('zewwwww');

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

        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY1);

        const paymentIntent = await stripe.charges.create(
          {
            amount: order['price'] * order['quantity'],
            currency: 'eur',
            source: 'tok_amex',
          },
          {
            stripeAccount: process.env.STRIPE_ACCOUNT_ID1,
          },
        );
        const paramss = {
          Message: JSON.stringify(paymentIntent),
          TopicArn: config.SNS_ARN,
        };
        this.sns.publish(paramss).promise();

        this.sqs.deleteMessageBatch(params, function (err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else console.log(order);
        });
      },
    }).start();
  }
}
