
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl:string='https://ecommerce.routemisr.com/api/v1/';
  constructor(private _HttpClient:HttpClient) {}

  getProduct(pageNum:number=1 ):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`products?page=${pageNum}`)
  }
  getCategories():Observable<any>{
    return this._HttpClient.get(this.baseUrl+`categories`)
  }
  getProductDetails(id:any):Observable<any>{
    return this._HttpClient.get(this.baseUrl+`products/${id}`)
  }
}
