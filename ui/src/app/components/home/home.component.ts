import { Component, OnInit } from '@angular/core';
import { BaseProductService } from '@services/base-product.service';
import { ResourceService } from '@services/resource.service';

import { BaseProduct } from "@models/BaseProduct";
// import { GreetingComponent } from '@reusable-components/greeting/greeting.component';
interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: any;
  selectedCity: any;

  cities: City[] = [
    {value: 'nagpur', viewValue: 'Nagpur'},
    {value: 'mumbai', viewValue: 'Mumbai'},
    {value: 'pune', viewValue: 'Pune'}
  ];

  baseProducts: BaseProduct[] = [];



    constructor(private resource: ResourceService, private service: BaseProductService) { }

    ngOnInit(): void {
      this.selectedCity = "nagpur";

      // this.resource.getProductList()
      //   .subscribe(products => {
      //     console.log(products);
      //     this.products = products;
      //   });

      console.log("getting base products");
      this.service.getBaseProductList()
        .subscribe(data => {
            this.baseProducts = data;
        });
    }



}
