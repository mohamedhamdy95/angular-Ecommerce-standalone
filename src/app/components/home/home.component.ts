import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/service/product.service';
import { Product } from 'src/app/core/interface/product';
import { CuttextPipe } from "../../core/pipe/cuttext.pipe";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [CommonModule, CuttextPipe]
})
export class HomeComponent implements OnInit {
  productList:Product[]=[]
constructor(private _ProductService:ProductService){}
ngOnInit(): void{
  this._ProductService.getProduct().subscribe({
    next:(respons)=>{
      this.productList = respons.data;
      console.log(this.productList)
    },
    error:(err)=> {
      console.log(err)
    },
  })
}
}
