import { Injectable } from '@nestjs/common';
const sgMail = require('@sendgrid/mail');
import * as AWS from 'aws-sdk';
import { config } from '../config';
const { Consumer } = require('sqs-consumer');
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
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: order['Email'], // Change to your recipient
          from: 'karimsalem25@gmail.com', // Change to your verified sender
          subject: 'order submitted yad ',
          text: 'shazly',
          html: '<strong>Your Order has been submited yad</strong>',
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent');
          })
          .catch((error) => {
            console.error(error);
          });
        this.sqs.deleteMessageBatch(params, function (err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else console.log(data); // successful response
        });
      },
    }).start();
  }

  sendMail() {}
}
