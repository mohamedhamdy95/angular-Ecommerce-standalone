import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/service/product.service';
import { Product } from 'src/app/core/interface/product';

@Component({
  selector: 'app-product-detauls',
  standalone: true,
  imports: [CommonModule],
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
}
