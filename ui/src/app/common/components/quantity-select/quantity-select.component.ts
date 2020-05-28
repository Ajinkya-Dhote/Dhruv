import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

export interface DialogData {
  product: any;
}

@Component({
  selector: 'app-quantity-select',
  templateUrl: './quantity-select.component.html',
  styleUrls: ['./quantity-select.component.scss']
})
export class QuantitySelectComponent implements OnInit {

  totalPrice: any = {};
  totalCost: number = 0;
  totalCostAfterdDiscount: number = 0;


  _value: number = 0;
  _step: number = 1;
  _min: number = 0;
  _max: number = Infinity;
  _wrap: boolean = false;

  constructor(
    // public dialogRef: MatDialogRef<QuantitySelectComponent>,
    private _bottomSheetRef: MatBottomSheetRef<QuantitySelectComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public product: any) {}


  ngOnInit(): void {
    console.log(this.product);
    
  }

  onCounterChange(price: any, quantity: number) {
    this.totalPrice[price.key] = {
      "quantity": quantity,
      "price": price.value.price,
      "discountPrice": price.value["discount price"] 
    };
    // console.log(this.totalPrice);
    this.calculateTotalPrice(this.totalPrice);
  }

  calculateTotalPrice(totalPrice) {
    // Object.keys(totalPrice).forEach(price => {
    //   console.log(price);
      
    // });
    let totalCost: number = 0;
    let totalCostAfterdDiscount: number = 0;
    for (let kg of Object.keys(totalPrice)) {
      const item = totalPrice[kg];
      totalCost = totalCost + (item.price * item.quantity);
      totalCostAfterdDiscount = totalCostAfterdDiscount + (item.discountPrice * item.quantity);
    }

    this.totalCost = totalCost;
    this.totalCostAfterdDiscount = totalCostAfterdDiscount;
  }
}
