import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  addedToCart: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleCart() {
    this.addedToCart = !this.addedToCart;
  }

}
