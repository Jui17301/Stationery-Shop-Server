
export interface IProduct {
    _id: any
    updatedAt: any
    createdAt: any
    name: string // Typescript type
    brand: string
    price: number
    category: 'Writing' | 'Office Supplies' | 'Educational' | 'Technology'
    description: string
    quantity: number
    inStock: boolean
   
  }