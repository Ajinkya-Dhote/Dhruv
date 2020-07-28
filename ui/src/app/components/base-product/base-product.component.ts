import { Component, OnInit, Input } from '@angular/core';
import { BaseProduct } from "@models/BaseProduct";

@Component({
  selector: 'app-base-product',
  templateUrl: './base-product.component.html',
  styleUrls: ['./base-product.component.scss']
})
export class BaseProductComponent implements OnInit {

  baseProducts: any[] = ["Wheat", "Besan", "Jowar", "Bajari"];

  constructor() { }

  @Input('base-product') baseProduct: BaseProduct;


  ngOnInit(): void {

  }

}
