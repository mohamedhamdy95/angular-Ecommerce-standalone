import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl:string='https://ecommerce.routemisr.com/api/v1/auth/'
  constructor(private _HttpClient:HttpClient) { }

  register(userData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl+'signup',userData)
  }
}
