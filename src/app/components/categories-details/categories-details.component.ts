import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/service/product.service';
import { Category } from 'src/app/core/interface/category';

@Component({
  selector: 'app-categories-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.scss']
})
export class CategoriesDetailsComponent implements OnInit {
  cateId: null| string='';
  categoreyData:Category ={} as Category
constructor(private _ActivatedRoute:ActivatedRoute ,private _ProductService:ProductService ){}
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          this.cateId = params.get('id')
        }
      })

      this._ProductService.getCategoriesDetails(this.cateId).subscribe({
        next:(respons)=>{
          this.categoreyData=respons.data
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }



  
  

}
