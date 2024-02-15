import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';


const routes: Routes = [
  // blank
  {path:'',canActivate:[authGuard],loadComponent:()=> import('./layouts/blank-layout/blank-layout.component').then((c)=>c.BlankLayoutComponent),
  children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',loadComponent:()=> import('./components/home/home.component').then((c)=>c.HomeComponent),title:"Home"},
    {path:'categories',loadComponent:()=> import('./components/categories/categories.component').then((c)=>c.CategoriesComponent),title:"Categories"},
    {path:'brand',loadComponent:()=> import('./components/brands/brands.component').then((c)=>c.BrandsComponent),title:"Brand"},
    {path:'cart',loadComponent:()=> import('./components/cart/cart.component').then((c)=>c.CartComponent),title:"Cart"},
    {path:'products',loadComponent:()=> import('./components/products/products.component').then((c)=>c.ProductsComponent),title:"Products"},
    {path:'details/:id',loadComponent:()=> import('./components/product-detauls/product-detauls.component').then((c)=>c.ProductDetaulsComponent),title:"Details"},
    {path:'payment/:id',loadComponent:()=> import('./components/payment/payment.component').then((c)=>c.PaymentComponent),title:"Payment"},
    {path:'allorders',loadComponent:()=> import('./components/all-orders/all-orders.component').then((c)=>c.AllOrdersComponent),title:"Orders"},
    {path:'forgetpassword',loadComponent:()=> import('./components/forget-password/forget-password.component').then((c)=>c.ForgetPasswordComponent),title:"ForgetPassword"},
  ]
},
// auth
  {path:'',loadComponent:()=> import('./layouts/auth-layout/auth-layout.component').then((c)=>c.AuthLayoutComponent),
    children:[
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'login',loadComponent:()=> import('./components/login/login.component').then((c)=>c.LoginComponent),title:"Login"},
      {path:'register',loadComponent:()=> import('./components/register/register.component').then((c)=>c.RegisterComponent),title:"Register"},
      {path:'forget',loadComponent:()=> import('./components/forget-password/forget-password.component').then((c)=>c.ForgetPasswordComponent),title:"ForgetPassword"},
    ]
  },
  // notfound
  {path:'**',loadComponent:()=> import('./components/not-found/not-found.component').then((c)=>c.NotFoundComponent),title:"404"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
