import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  weight: { type: Number, required: true },
  measurement: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
});

export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public image: string,
    public weight: number,
    public measurement: string,
    public category: string,
    public stock: number,
  ) {}
}
