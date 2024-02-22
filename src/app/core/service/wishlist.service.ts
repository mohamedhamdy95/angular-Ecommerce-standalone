import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl:string='https://ecommerce.routemisr.com/api/v1/';
  constructor(private _HttpClient:HttpClient) { }

  addToWishList(prodId:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `wishlist`,
    {
      productId: prodId
    }
    )
  }

  gitWishList():Observable<any>{
    return this._HttpClient.get(this.baseUrl+`wishlist`)
  }

  removeItemFromWishList(prodId:any):Observable<any>{
    return this._HttpClient.delete(this.baseUrl+`wishlist/${prodId}`)
  }

}
