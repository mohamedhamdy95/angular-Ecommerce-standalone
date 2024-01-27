// export interface Product {
//   title:string;
//   description:string;
//   category:{name : string;}
//   price:number;
//   imageCover:string;
//   ratingsAverage:number;
// }



export interface Product {
  ratingsQuantity: number
  title: string
  slug: string
  description: string
  price: number
  imageCover: string
  category: CategoryProd
  ratingsAverage: number
}
export interface CategoryProd {
  name: string
}
