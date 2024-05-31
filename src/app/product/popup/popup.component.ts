import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit{

   des : string = ""

  constructor(private productService : ProductService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit(): void {
    this.des = JSON.stringify(this.data)
    console.log(""+this.data)
  }

  closeDialog() {
    this.dialog.closeAll();
  }

}
