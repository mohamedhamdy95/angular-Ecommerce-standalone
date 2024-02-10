import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/service/cart.service';
import { ProductService } from 'src/app/core/service/product.service';
import { Product } from 'src/app/core/interface/product';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from "../../core/pipe/cuttext.pipe";
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    imports: [CommonModule, RouterLink, CuttextPipe , NgxPaginationModule]
})
export class ProductsComponent implements OnInit {
  productList:Product[]=[]
  pageSize:number=0;
  p:number=1;
  total:number=0;
constructor(private _ProductService:ProductService , private _CartService:CartService , private toaster:ToastrService ,private _Renderer2:Renderer2){}
ngOnInit(): void {
  this._ProductService.getProduct().subscribe({
    next:(respons)=>{
      this.productList = respons.data;
      this.pageSize=respons.metadata.limit;
      this.p=respons.metadata.currentPage;
      this.total=respons.results;
      // console.log(this.productList)
    },
    error:(err)=> {
      console.log(err)
    },
  });
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

pageChanged(event:any):void{
  this._ProductService.getProduct(event).subscribe({
    next:(respons)=>{
      this.productList = respons.data;
      this.pageSize=respons.metadata.limit;
      this.p=respons.metadata.currentPage;
      this.total=respons.results;
      // console.log(this.productList)
    },
    error:(err)=> {
      console.log(err)
    },
  });
}
}
