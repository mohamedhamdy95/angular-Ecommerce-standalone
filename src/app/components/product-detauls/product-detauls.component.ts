import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/service/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

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
constructor(private _ActivatedRoute:ActivatedRoute , private _ProductService:ProductService ){}
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
