import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = environment.apiUrl + "/cart";

  private checkOutUrl = environment.apiUrl + "/checkout";

  constructor(private http : HttpClient) { }

  addToCart(product : Product) : Observable<number> {
    return this.http.post<number>(this.apiUrl, product);
  }

  getCartItems() : Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  clearCart() : Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }

  removeItem(product : Product) : Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${product.id}`)
  }

  checkOut(products : Product[]) : Observable<void> {
    return this.http.post<void>(this.checkOutUrl, products);
  }
}
