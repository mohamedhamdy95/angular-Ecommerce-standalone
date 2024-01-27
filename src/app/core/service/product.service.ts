
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl:string='https://ecommerce.routemisr.com/api/v1/';
  constructor(private _HttpClient:HttpClient) {}

  getProduct():Observable<any>{
    return this._HttpClient.get(this.baseUrl+`products`)
  }
  getCategories():Observable<any>{
    return this._HttpClient.get(this.baseUrl+`categories`)
  }
  getDetails():Observable<any>{
    return this._HttpClient.get(this.baseUrl+`categories`)
  }
}
