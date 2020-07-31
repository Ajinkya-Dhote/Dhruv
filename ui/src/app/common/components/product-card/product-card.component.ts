import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

import { QuantitySelectComponent } from '@reusable-components/quantity-select/quantity-select.component';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  addedToCart: boolean = false;

  @Input('product') product: any;
  constructor(private dialog: MatDialog,
              private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    console.log(this.product);

  }

  toggleCart() {
    this.addedToCart = !this.addedToCart;
    if (this.addedToCart) {
      this.openDialog();
    }
  }

  openDialog(): void {
    // const dialogRef = this.dialog.open(QuantitySelectComponent, {
    //   width: '250px',
    //   data: this.product
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
    this._bottomSheet.open(QuantitySelectComponent, {
      data: this.product
    });
  }

}
