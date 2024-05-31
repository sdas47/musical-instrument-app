import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartViewComponent } from './cart-view/cart-view.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    CartViewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule
  ]
})
export class CartModule { }
