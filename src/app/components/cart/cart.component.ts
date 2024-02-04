import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cartItems:any=null;
  constructor(private _CartService:CartService , private toaster:ToastrService , private _Renderer2:Renderer2){}
ngOnInit(): void {
    this._CartService.getCartUser().subscribe({
      next:(respons)=>{
        this.cartItems=respons.data;
        console.log(this.cartItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })
}
deleteItem(id:string , ele:HTMLButtonElement):void{
  this._Renderer2.setAttribute(ele ,"disabled","true")
  this._CartService.deletCartItem(id).subscribe({
    next:(respons)=>{
      this.toaster.error("Item Deleted");
      this.cartItems=respons.data;
      this._Renderer2.removeAttribute(ele ,"disabled")
      this._CartService.cartNumber.next(respons.numOfCartItems)
      // console.log(respons);
    },
    error:(err)=>{
      this._Renderer2.removeAttribute(ele ,"disabled")
      console.log(err);
    }
  })
}

changeCouunt(count:number ,  id:string ,ele1: HTMLButtonElement ,ele2: HTMLButtonElement ):void{
  if(count >= 1){
    this._Renderer2.setAttribute(ele1 ,"disabled","true")
    this._Renderer2.setAttribute(ele2 ,"disabled","true")
    this._CartService.changeCount(id,count).subscribe({
      next:(respons)=>{
        this.cartItems=respons.data;
        this._Renderer2.removeAttribute(ele1 ,"disabled")
        this._Renderer2.removeAttribute(ele2 ,"disabled")
      // console.log(respons)
      },
      error:(err)=>{
        this._Renderer2.removeAttribute(ele1 ,"disabled")
        this._Renderer2.removeAttribute(ele2 ,"disabled")
        console.log(err)
      }
      })
      }
  }

  clearAll():void{
    this._CartService.clearCart().subscribe({
      next:(respons)=>{
        if(respons.message === "success"){
          this.toaster.error("You Deleted Your Cart");
          this.cartItems=null;
          this._CartService.cartNumber.next(0)
        }
        console.log(respons)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
