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



  constructor(
    // public dialogRef: MatDialogRef<QuantitySelectComponent>,
    private _bottomSheetRef: MatBottomSheetRef<QuantitySelectComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public products: any) {}

    ngOnInit(): void {
        console.log(this.products);
    }
}
