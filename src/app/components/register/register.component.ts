import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    rePassword : new FormGroup(''),
    phone : new FormGroup('',[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),



  })
}
