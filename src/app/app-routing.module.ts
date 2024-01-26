import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';


const routes: Routes = [
  {path:'',canActivate:[authGuard],loadComponent:()=> import('./layouts/blank-layout/blank-layout.component').then((c)=>c.BlankLayoutComponent),
  children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',loadComponent:()=> import('./components/home/home.component').then((c)=>c.HomeComponent),title:"Home"},
    {path:'categories',loadComponent:()=> import('./components/categories/categories.component').then((c)=>c.CategoriesComponent),title:"Categories"},
    {path:'brand',loadComponent:()=> import('./components/brands/brands.component').then((c)=>c.BrandsComponent),title:"Brand"},
    {path:'cart',loadComponent:()=> import('./components/cart/cart.component').then((c)=>c.CartComponent),title:"Cart"},
    {path:'products',loadComponent:()=> import('./components/products/products.component').then((c)=>c.ProductsComponent),title:"Products"},
    // {path:'home',loadComponent:()=> import('./components/home/home.component').then((c)=>c.HomeComponent)},
    // {path:'home',loadComponent:()=> import('./components/home/home.component').then((c)=>c.HomeComponent)},
  ]
},
  {path:'',loadComponent:()=> import('./layouts/auth-layout/auth-layout.component').then((c)=>c.AuthLayoutComponent),
    children:[
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'login',loadComponent:()=> import('./components/login/login.component').then((c)=>c.LoginComponent),title:"Login"},
      {path:'register',loadComponent:()=> import('./components/register/register.component').then((c)=>c.RegisterComponent),title:"Register"},
    ]
  },
  {path:'**',loadComponent:()=> import('./components/not-found/not-found.component').then((c)=>c.NotFoundComponent),title:"404"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
