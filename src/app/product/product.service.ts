import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl + "/instruments";

  constructor(private http : HttpClient,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<PopupComponent>) { }

  getProducts() : Observable<Product[]> {
    let basicAuthHeaderString = this.createBasicAuthHttpHeader();
    //let headers = new HttpHeaders().set('Authorization',basicAuthHeaderString)
    let headers = new HttpHeaders({
      Authorization : basicAuthHeaderString
    })
                      
    return this.http.get<Product[]>(this.apiUrl,{headers});
  }

  createBasicAuthHttpHeader() {
    let username = 'Saikat'
    let password = '1234'
    let basicAuthHeaderString = 'Basic '+ window.btoa(username + ':' + password)
    return basicAuthHeaderString
  }

  openPopup(product : Product) {
    console.log(product.description)
    let description = product.description
    const dialogRef = this.dialog.open(PopupComponent,{
      data : { description }      
    });
    
  }

  // closePopup() {
  //   this.dialog.closeAll();
  // }
}
