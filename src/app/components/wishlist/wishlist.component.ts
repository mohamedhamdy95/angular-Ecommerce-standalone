import { Component, OnInit ,Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/service/wishlist.service';
import { CuttextPipe } from "../../core/pipe/cuttext.pipe";
import { Product } from 'src/app/core/interface/product';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule ,CuttextPipe , RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishListData:string[]=[];
  productList:Product[]=[]
  constructor( private _WishlistService:WishlistService , private _Renderer2:Renderer2 ,private _CartService:CartService , private toaster:ToastrService){}

  ngOnInit():void{
    this._WishlistService.gitWishList().subscribe({
      next:(respons)=>{
        this.productList = respons.data
        const newData = respons.data.map((item:any)=> item._id)
        this.wishListData= newData;
        console.log(this.productList)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  addProductToCart(id:any , ele:HTMLButtonElement ):void{
    this._Renderer2.setAttribute(ele,'disabled','true');
    this._CartService.addToCart(id).subscribe({
      next:(respons)=>{
        this.toaster.success(respons.message);
        this._CartService.cartNumber.next(respons.numOfCartItems);
        console.log(respons)
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        this._Renderer2.removeAttribute(ele,'disabled');
      }
    })
  }


  // add product to wish list

addItemToWishList(id:any):void{
  this._WishlistService.addToWishList(id).subscribe({
    next:(respons)=>{
      this.toaster.success(respons.message);
      this.wishListData = respons.data;
      console.log( this.wishListData)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

// add product to wish list

removeFromWishList(id:any):void{
  this._WishlistService.removeItemFromWishList(id).subscribe({
  next:(respons)=>{
      this.toaster.error(respons.message);
      this.wishListData = respons.data;
      const newProductList = this.productList.filter((item:any)=> this.wishListData.includes(item._id) )
      this.productList = newProductList
    },
    error:(err)=>{
      console.log(err)
    }
  })
}


}
