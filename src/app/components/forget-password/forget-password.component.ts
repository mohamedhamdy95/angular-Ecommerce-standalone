import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetPassService } from 'src/app/core/service/forget-pass.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
step1:boolean=true;
step2:boolean=false;
step3:boolean=false;
email:string ='';
constructor(private _ForgetPassService:ForgetPassService , private toaster:ToastrService , private Router:Router){}
forgetPassForm:FormGroup = new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email])
})
resetCodeForm:FormGroup = new FormGroup({
  resetCode:new FormControl('',[Validators.required])
})
resetPasswordForm:FormGroup = new FormGroup({
  newPassword:new FormControl('',[Validators.required])
})
forgetPassword():void{
  let userEmail = this.forgetPassForm.value;
  this.email= userEmail.email;
  this._ForgetPassService.forgotPassword(userEmail).subscribe({
    next:(respons)=>{
      this.toaster.success(respons.message);
      this.step1 = false;
      this.step2=true;
    },
    error:(err)=>{
      this.toaster.error(err.error.message);
    }
  })
}
resetCodeFun():void{
  let resetCode = this.resetCodeForm.value;
  this._ForgetPassService.verifyResetCode(resetCode).subscribe({
    next: respons => {
      this.toaster.success(respons.status);
      this.step2=false;
      this.step3=true;
    },
    error: err =>{
      this.toaster.error(err.error.message);
    }
  })
}
resetpass():void{
  let newpasswordObj = this.resetPasswordForm.value;
  newpasswordObj.email = this.email
  this._ForgetPassService.rsetPassword(newpasswordObj).subscribe({
    next: respons =>{
      if(respons.token){
        localStorage.setItem('eToken', respons.token )
        this.Router.navigate(['/home'])
      }
    },
    error: err =>{
      this.toaster.error(err.error.message);
    }
  })
}
}
