import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo:any;
  baseUrl:string='https://ecommerce.routemisr.com/api/v1/auth/';

  constructor(private _HttpClient:HttpClient) { }
  register(registerData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl+'signup',registerData)
  }
  login(loginData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl+'signin',loginData)
  }

  decodeUser(){
    const encodeToken = localStorage.getItem('eToken')
    // console.log(encodeToken)
    if(encodeToken !== null){
      const decodeToken = jwtDecode(encodeToken)
      this.userInfo = decodeToken;
      // console.log(this.userInfo);
    }
  }

}
