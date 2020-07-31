import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { QuantityDialogComponent } from '@reusable-components/quantity-dialog/quantity-dialog.component';

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
    @Inject(MAT_BOTTOM_SHEET_DATA) public products: any,
    public dialog: MatDialog) {}

    ngOnInit(): void {
        // console.log(this.products);
    }

    openQuantitySelectionDialog(product): void {
      const dialogRef = this.dialog.open(QuantityDialogComponent, {
        // width: '250px',
        data: product
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this._bottomSheetRef.dismiss();
      });
    }
}
