
export interface IProduct {
    name: string // Typescript type
    brand: string
    price: number
    category: 'Writing' | 'Office Supplies' | 'Educational' | 'Technology'
    description: string
    quantity: number
    inStock: boolean
   
  }