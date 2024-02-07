import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from 'src/app/core/service/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  cartId:string|null='';
  constructor(private _ActivatedRoute:ActivatedRoute , private _CartService:CartService){}
ngOnInit(): void {
this._ActivatedRoute.paramMap.subscribe({
  next:(respons)=>{
    this.cartId=respons.get('id')
    console.log(this.cartId)
  }
})
}

orderForm = new FormGroup({
  details:new FormControl(''),
  phone:new FormControl(''),
  city:new FormControl(''),
})
handleForm():void{
 
  this._CartService.checkOut(this.cartId,this.orderForm.value).subscribe({
    next:(respons)=>{
      if(respons.status="success"){
        window.open(respons.session.url)
      }
      // console.log(respons)
      // console.log(respons.session.url)
    }
  })
// console.log(this.orderForm.value)
}
}

// http://localhost:4200/allorders
