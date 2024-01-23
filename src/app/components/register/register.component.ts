import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/service/auth.service';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService){}

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

  handleForm(){
    console.log(this.registerForm.value)
  }

}
