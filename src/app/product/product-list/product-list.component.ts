import { Component,OnInit, Output } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasicAuthenticationService } from '../../service/basic-authentication.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products : Product[] = []
  filteredProducts : Product[] = []
  sortOrder : string = ""
  isUserLoggedIn : boolean = false

  constructor(private productService : ProductService,
              private cartService : CartService,
              private snackBar : MatSnackBar,
              protected basicAuthenticationService : BasicAuthenticationService 
    ) {}

  

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data=>{
      this.products = data;
      this.filteredProducts = data;
      console.log(this.products)
    })
    this.isUserLoggedIn = this.basicAuthenticationService.isUserLoggedIn();
  }

  addToCart(product : Product) : void {
    this.cartService.addToCart(product).subscribe({
      next : () => {
        this.snackBar.open("Product added to cart!","",{
          duration : 2000,
          horizontalPosition : 'right',
          verticalPosition : 'top'
        })
      },
      error : ()=>{
        this.snackBar.open("Product is already added in your cart!","OK",{
          duration : 4000,
          panelClass: ['blue-snackbar'],
          horizontalPosition : 'right',
          verticalPosition : 'top'
        })
      }
    });
  }

  applyFilter(event : Event) : void {
    let searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter(
      product => product.name.toLowerCase().includes(searchTerm)
    )
  }

  sortProducts(sortValue : string) {
    this.sortOrder = sortValue;
    if(this.sortOrder==="priceLowHigh") {
      this.filteredProducts.sort((a,b)=>a.price-b.price)
    }
    else if(this.sortOrder==="priceHighLow") {
      this.filteredProducts.sort((a,b)=>b.price-a.price)
    }
  }

  openPopup(product : Product) {
    this.productService.openPopup(product);
  }

}
