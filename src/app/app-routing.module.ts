import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CartViewComponent } from './cart/cart-view/cart-view.component';
import { LoginProcessComponent } from './login/login-process/login-process.component';
import { RouteGuardService, authGuard } from './service/route-guard.service';
import { LogoutProcessComponent } from './logout-process/logout-process.component';

const routes: Routes = [
   {path: '', redirectTo: '/login', pathMatch: 'full'},
   {path: 'login', component: LoginProcessComponent},
   {path: 'instruments', component: ProductListComponent,canActivate:[authGuard]},
   {path: 'cart', component: CartViewComponent,canActivate:[authGuard]},
   {path: 'logout', component: LogoutProcessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
