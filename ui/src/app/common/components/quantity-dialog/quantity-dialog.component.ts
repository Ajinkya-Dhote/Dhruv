import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '@services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quantity-dialog',
  templateUrl: './quantity-dialog.component.html',
  styleUrls: ['./quantity-dialog.component.scss']
})
export class QuantityDialogComponent implements OnInit {

    totalQuantity: number = 0;
    totalPrice: number = 0;
    unit: string;

    constructor(public dialogRef: MatDialogRef<QuantityDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public cartService: CartService,
                public router: Router) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    goToCheckOut() {
        this.dialogRef.close();
        this.router.navigate(["checkout"]);
    }

    ngOnInit(): void {
    }

    add(quantity) {
        quantity = {...quantity, productId: this.data.id, name: this.data.name, baseProductId: this.data.baseProductId};
        this.cartService.add(quantity);
    }

    remove(quantity) {
        this.cartService.remove(quantity);
    }

    isSumarryVisible() {
        return !(this.cartService.get().length > 0);
    }

    getSummary() {
        if (this.data.categories && this.data.categories[0].productId) {
                let productId = this.data.categories[0].productId;
                let totalPrice = 0;
                let totalQuantity = 0;
                let unit;
                for(let item of this.cartService.getProduct(productId)) {
                    if (productId === item.productId) {
                        totalPrice = totalPrice + item.price;
                        totalQuantity = totalQuantity + item.quantity;
                        unit = item.unit;
                    }
                }
                return {totalPrice, totalQuantity, unit};
            }
    }

    getCount(productId, id) {
        const products = this.cartService.getProduct(productId);
        return products.filter(p => p.id === id).length;
    }

    // getSummary() {
    //     if (this.data.categories && this.data.categories[0].productId) {
    //         let productId = this.data.categories[0].productId;
    //         let {totalPrice, totalQuantity} = this.cartService.getSummary(productId);
    //         return {totalPrice, totalQuantity, unit: this.data.categories[0].unit};
    //     }
    // }

}
