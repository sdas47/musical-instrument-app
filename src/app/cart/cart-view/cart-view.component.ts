import { Component,OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css'
})
export class CartViewComponent implements OnInit {
  
  cartItems : Product[] = [];
  totalPrice : number = 0;

  constructor(private cartService : CartService) {

  }
  

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data=>{
      this.cartItems = data;
      this.totalPrice = this.getTotalPrice();
    })
    
  }
  getTotalPrice() : number {
    let total = 0;
    for(let item of this.cartItems) {
      total+=item.price;
    }
    return total;
  }
  clearCart() : void {
    this.cartService.clearCart().subscribe();
    this.cartItems = [];
    this.totalPrice = 0;
  }
  removeItem(product : Product) : void {    
    this.cartService.removeItem(product).subscribe(data=>{
      this.cartItems = this.cartItems.filter(item=>item!==data)
      this.totalPrice = this.getTotalPrice()
    });
    window.location.reload()
  }
  checkOut() : void {
    this.cartService.checkOut(this.cartItems).subscribe();
  }

}
