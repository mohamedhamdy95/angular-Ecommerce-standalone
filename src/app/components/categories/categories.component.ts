import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/service/product.service';
import { Category } from 'src/app/core/interface/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  catList:Category[]=[]
constructor(private ProductService:ProductService){}
ngOnInit(): void {
  this.ProductService.getCategories().subscribe({
    next:(respons)=>{
      this.catList=respons.data
      console.log(this.catList)
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

}
