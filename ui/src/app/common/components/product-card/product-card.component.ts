import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  addedToCart: boolean = false;

  @Input('product') product: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.product);
    
  }

  toggleCart() {
    this.addedToCart = !this.addedToCart;
  }

}
