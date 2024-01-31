import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
baseUrl:string=`https://ecommerce.routemisr.com/api/v1/`;
myToken:any={
  token :localStorage.getItem('eToken')
}
  constructor( private _HttpClient:HttpClient ) {}
  addToCart(prodId:string):Observable<any>{
return this._HttpClient.post(this.baseUrl +`cart`,
{
  // body
  productId: prodId
},
{
// header => object
headers: this.myToken
}
)
  }
}
