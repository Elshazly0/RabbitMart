import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { EventListeners } from 'aws-sdk';
import { receiveMessageOnPort } from 'worker_threads';
import { AppService } from './app.service';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) {
    this.appService.handleCron();
  }

  @Post()
  async addProduct(
    @Body('name') prodTitle: string,
    @Body('price') prodPrice: number,
    @Body('image') prodimg: string,
    @Body('weight') prodWeight: number,
    @Body('measurement') prodMes: string,
    @Body('category') prodCate: string,
    @Body('stock') prodStock: number,
  ) {
    const generatedId = await this.appService.insertProduct(
      prodTitle,
      prodPrice,
      prodimg,
      prodWeight,
      prodMes,
      prodCate,
      prodStock,
    );
    return { id: generatedId };
  }

  @Get()
  async GetProducts() {
    const products = this.appService.Getproducts();
    return products;
  }
  @Get(':userid')
  GetProduct(@Param('userid') userid: string): any {
    return this.appService.FindProduct(userid);
  }

  @Put('/:ProductID')
  updateAccount(
    @Param('ProductID') ProdId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.appService.updataProduct(ProdId, quantity);
  }
}
