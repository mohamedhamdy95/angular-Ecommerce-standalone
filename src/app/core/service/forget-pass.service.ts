import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retryWhen } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPassService {
  baseUrl:string='https://ecommerce.routemisr.com/api/v1/auth/';
  constructor(private _HttpClient: HttpClient) { }

  
  forgotPassword(userEmail:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `forgotPasswords` , userEmail)
  }

  verifyResetCode(resetCode:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl+`verifyResetCode`,resetCode)
  }

  rsetPassword(rsetPasswordData:object):Observable<any>{
    return this._HttpClient.put(this.baseUrl+`resetPassword`,rsetPasswordData)
  }

}
