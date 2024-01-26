import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, FormControlOptions, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService , private _Router:Router , private _FormBuilder:FormBuilder){}
  errMesg:string="";
  sucMesg:string="";
  isLoading:boolean = false;
  userToken:string='';
//**************** loginForm whith form builder ************
  // loginForm : FormGroup = this._FormBuilder.group({
  //   name : ['',[Validators.required, Validators.minLength(5),Validators.maxLength(30)]],
  //   email : ['',[Validators.required,Validators.email] ,
  // })

  loginForm : FormGroup = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
  } )

  handleForm():void{
    const userData = this.loginForm.value;
    this.isLoading=true;
    if(this.loginForm.valid === true){
      this._AuthService.login(userData).subscribe({
        next:(respons)=>{
          console.log(respons)
          this.isLoading=false;
          if(respons.message === "success"){
            // this.userToken=respons.token;
            // localStorage.setItem('usertoken',respons.token)
            localStorage.setItem('eToken', respons.token )
            this._AuthService.decodeUser();
            this._Router.navigate(['/home'])
          }
         this.sucMesg = respons.message
          // console.log(this.userToken)
        },
        error:(err)=>{
          this.errMesg = err.error.message;
          this.isLoading=false;
          // console.log(this.errMesg)
        },
        complete:()=>{}
      })
    }
    console.log(userData)
  }

}
