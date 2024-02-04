import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/service/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {
  cartNum:number=0;
  constructor(private _Router:Router , private _CartService:CartService){}
  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:(data)=>{
        this.cartNum=data;
      }
    })

    this._CartService.getCartUser().subscribe({
      next:(respons)=>{
        this.cartNum = respons.numOfCartItems;
      }
    })

  }
  signOut():void{
    localStorage.removeItem('eToken');
    this._Router.navigate(['/login'])

  }
}
