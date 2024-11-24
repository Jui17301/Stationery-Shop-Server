export interface IProduct {
  
  id?: string;
  name: string;
  brand: string;
  price: number;
  category: 'Writing' | 'Office Supplies' | 'Educational' | 'Technology';
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
