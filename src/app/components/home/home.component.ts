import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/service/product.service';
import { Product } from 'src/app/core/interface/product';
import { CuttextPipe } from "../../core/pipe/cuttext.pipe";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/core/interface/category';
import {RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [CommonModule, CuttextPipe,CarouselModule ,RouterLink]
})
export class HomeComponent implements OnInit {
  productList:Product[]=[]
  categorisList:Category[]=[]
constructor(private _ProductService:ProductService){}
ngOnInit(): void{
  this._ProductService.getProduct().subscribe({
    next:(respons)=>{
      this.productList = respons.data;
      // console.log(this.productList)
    },
    error:(err)=> {
      console.log(err)
    },
  });
  this._ProductService.getCategories().subscribe({
    next:(respons)=> {
      this.categorisList = respons.data;
        console.log(this.categorisList)
    },
  })
}
categoreyOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  autoplay:true,
  autoplaySpeed:700,
  autoplayTimeout:5000,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: false
}
mainOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  autoplay:true,
  autoplaySpeed:1000,
  autoplayTimeout:5000,
  pullDrag: true,
  dots: true,
  responsive: {
    0: {
      items: 1
    },
  },
}
}
