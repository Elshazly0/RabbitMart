import * as AWS from 'aws-sdk';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { config } from '../config';
import { Cron, CronExpression } from '@nestjs/schedule';
const { Consumer } = require('sqs-consumer');
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model, NumberSchemaDefinition } from 'mongoose';
import { privateDecrypt } from 'crypto';

@Injectable()
export class AppService {
  params = {
    QueueUrl: config.TEST_QUEUE_URL,
  };
  private sqs;
  private sns;
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {
    AWS.config.update({
      region: 'us-east-1',
      accessKeyId: config.ACCESS_KEY_ID,
      secretAccessKey: config.SECRET_ACCESS_KEY,
    });
    this.sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
    this.sns = new AWS.SNS({ apiVersion: '2010-03-31' });
  }

  async FindProduct(id: string): Promise<Product> {
    return this.productModel.findOne({ id: id }).exec();
  }

  async updataProduct(ProdId: string, quantity: number): Promise<Product> {
    let Product;

    try {
      Product = await this.productModel.findOne({ id: ProdId }).exec();
      console.log(Product);
      Product.stock = Product.stock - quantity;
    } catch (error) {
      throw new NotFoundException('Could not find Account.');
    }
    if (!Product) {
      throw new NotFoundException('Could not find Account.');
    }
    console.log('done');

    Product.save();
    return Product;
  }

  async Getproducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      image: prod.image,
      weight: prod.weight,
      measurement: prod.measurement,
      category: prod.category,
      stock: prod.stock,
    }));
  }

  async insertProduct(
    name: string,
    price: Number,
    image: string,
    weight: Number,
    measurement: string,
    category: string,
    stock: Number,
  ) {
    const newProduct = new this.productModel({
      name,
      price,
      image,
      weight,
      measurement,
      category,
      stock,
    });
    const result = await newProduct.save();
    return result.id as string;
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
        console.log(order['id']);
        this.updataProduct(order['id'], order['quantity']);
        this.sqs.deleteMessageBatch(params, function (err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else console.log(data); // successful response
        });
      },
    }).start();
  }
}
interface snsMessage {
  header: any;
  body: any;
}
