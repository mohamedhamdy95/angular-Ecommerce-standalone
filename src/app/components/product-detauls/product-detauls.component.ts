import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/service/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detauls',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './product-detauls.component.html',
  styleUrls: ['./product-detauls.component.scss']
})
export class ProductDetaulsComponent implements OnInit {
  productId:any=''
  details:any={};
constructor(private _ActivatedRoute:ActivatedRoute , private _ProductService:ProductService,private _CartService:CartService,private _Renderer2:Renderer2 ,private toaster:ToastrService ){}
ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(respons)=>{
        this.productId = respons.get('id');
        // console.log(this.productId)
      }
    });
    this._ProductService.getProductDetails(this.productId).subscribe({
      next:(respons)=>{
        this.details=respons.data
        console.log(this.details)
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

customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  autoplay:true,
  dots: true,
  navSpeed: 700,
  responsive: {
    0: {
      items: 1
    },
  },
}
}
