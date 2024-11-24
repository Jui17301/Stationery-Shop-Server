import { Types } from 'mongoose';

export interface IOrder {
  id: string;
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
