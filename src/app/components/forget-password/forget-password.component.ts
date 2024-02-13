import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
step1:boolean=true;
step2:boolean=false;
step3:boolean=false;


forgetPass:FormGroup = new FormGroup({
  email:new FormControl('',[Validators.required,Validators.email])
})
resetCode:FormGroup = new FormGroup({
  resetCode:new FormControl('',[Validators.required])
})
resetPassword:FormGroup = new FormGroup({
  newPassword:new FormControl('',[Validators.required])
})


}
