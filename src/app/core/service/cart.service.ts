import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
baseUrl:string=`https://ecommerce.routemisr.com/api/v1/`;
cartNumber:BehaviorSubject<number> = new BehaviorSubject(0);
myToken:any={
  token :localStorage.getItem('eToken')
};
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
getCartUser():Observable<any>{
  return this._HttpClient.get(this.baseUrl +`cart`,{headers:this.myToken})
}

deletCartItem(prodId:string):Observable<any>{
  return this._HttpClient.delete(this.baseUrl+`cart/${prodId}`,
  {
    headers: this.myToken
  }
  )
}

changeCount(id:string ,countNum:number ):Observable<any>{
  return this._HttpClient.put(this.baseUrl + `cart/${id}`,
  {
    count: countNum
  },
  {
    headers: this.myToken
  }
  )
}
clearCart():Observable<any>{
return this._HttpClient.delete(this.baseUrl+`cart`,
{
  headers:this.myToken
}
)
}

}
