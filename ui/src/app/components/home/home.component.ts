import { Component, OnInit } from '@angular/core';

import { ResourceService } from '@services/resource.service';
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

  baseProducts: any[] = ["Wheat", "Besan", "Jowar", "Bajari"];



  constructor(private resource: ResourceService) { }

  ngOnInit(): void {
      this.selectedCity = "nagpur";

    this.resource.getProductList()
        .subscribe(products => {
          console.log(products);
          this.products = products;
        });
  }

}
