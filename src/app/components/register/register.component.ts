import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/service/auth.service';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService , private _Router:Router , private _FormBuilder:FormBuilder){}
  errMesg:string="";
  sucMesg:string="";
  isLoading:boolean = false;
//**************** registerForm whith form builder ************
  // registerForm : FormGroup = this._FormBuilder.group({
  //   name : ['',[Validators.required, Validators.minLength(5),Validators.maxLength(30)]],
  //   email : ['',[Validators.required,Validators.email] ,
  // })



  registerForm : FormGroup = new FormGroup({
    name : new FormControl('',[Validators.required , Validators.minLength(5),Validators.maxLength(30)]),
    email : new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
    rePassword : new FormControl(''),
    phone : new FormControl('',[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  } , {validators:[this.confirmPass]} as FormControlOptions )

// repassword matching method
  confirmPass(group:FormGroup):void{
    const pass = group.get('password')
    const rePass = group.get('rePassword')

    if(rePass?.value == ''){
      rePass?.setErrors({required : true})
    }
    else if(pass?.value != rePass?.value){
      rePass?.setErrors({missmatch : true})
    }
  }



  handleForm():void{
    const userData = this.registerForm.value;
    this.isLoading=true;
    if(this.registerForm.valid === true){
      this._AuthService.register(userData).subscribe({
        next:(respons)=>{
          this.isLoading=false;
          if(respons.message === "success"){
            this._Router.navigate(['/login'])
          }
         this.sucMesg = respons.message
          // console.log(respons)
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
