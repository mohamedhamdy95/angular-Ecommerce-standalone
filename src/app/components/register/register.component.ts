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
    name : new FormControl(null,[Validators.required]),
    email : new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required]),
    rePassword : new FormGroup(null,[Validators.required]),


    // "name": "Ahmed Abd Al-Muti",
    // "email":"ahmedmutti@gmail.com",
    // "password":"Ahmed@123",
    // "rePassword":"Ahmed@123",
    // "phone":"01010700700"
  })
}
