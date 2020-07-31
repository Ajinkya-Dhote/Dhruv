import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@services/cart.service';
import { BaseProductService } from '@services/base-product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    isLinear = false;
    purchasedItems: any = {};
    totalCost: number = 0;
    constructor(public cartService: CartService,
                public baseProductServiceservice: BaseProductService,
                public router: Router) { }

    ngOnInit(): void {

        if (this.cartService.get().length === 0) {
            this.router.navigate(["home"]);
        }

        this.cartService.get()
            .forEach(p => {
                const id = p.id;
                if (this.purchasedItems[id]) {
                    const price = this.purchasedItems[id]["price"];
                    this.purchasedItems[id]["price"] = this.purchasedItems[id]["price"] + p.price;
                    this.purchasedItems[id]["purchasedUnits"] = this.purchasedItems[id]["purchasedUnits"] + 1;
                } else {
                    this.purchasedItems[id] = p;
                    this.purchasedItems[id]["purchasedUnits"] = 1;
                }
                console.log(this.purchasedItems);
            });

            // console.log(Object.values(this.purchasedItems));
        this.totalCost = Number(Object.values(this.purchasedItems).reduce((total: number, item: any) =>
            total + item.price, 0));
    }

    isCheckoutAvailable(): boolean {
        return (Object.keys(this.purchasedItems).length === 0);
    }

}
