import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetPassService } from 'src/app/core/service/forget-pass.service';
import { ToastrService } from 'ngx-toastr';
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

constructor(private _ForgetPassService:ForgetPassService , private toaster:ToastrService){}


forgetPassForm:FormGroup = new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email])
})
resetCode:FormGroup = new FormGroup({
  resetCode:new FormControl('',[Validators.required])
})
resetPassword:FormGroup = new FormGroup({
  newPassword:new FormControl('',[Validators.required])
})
forgetPassword():void{
  // this.step1 = false;
  // this.step2=true;
  let userEmail = this.forgetPassForm.value;
  this._ForgetPassService.forgotPassword(userEmail).subscribe({
    next:(respons)=>{
      this.toaster.success(respons.message);
      console.log(respons)
    },
    error:(err)=>{
      console.log(err)
    }
  })
  console.log('step1')
}
resetCodeFun():void{
  this.step2=false;
  this.step3=true;
  console.log('step2')
}
resetpass():void{
  console.log('step3')
}
}
