import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    public items: any[] = [];

    constructor() { }

    add(quantity) {
        this.items.push(quantity);
    }

    remove(quantity) {
        const index = this.items.findIndex((i) => i.id === quantity.id);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    get() {
        return this.items;
    }

    getProduct(productId) {
        return this.items.filter(item => item.productId === productId);
    }


}
