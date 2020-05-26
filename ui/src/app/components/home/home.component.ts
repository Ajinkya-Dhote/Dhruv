import { Component, OnInit } from '@angular/core';

import { ResourceService } from '@services/resource.service';
// import { GreetingComponent } from '@reusable-components/greeting/greeting.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: any;

  constructor(private resource: ResourceService) { }

  ngOnInit(): void {
    this.resource.getProductList()
        .subscribe(products => {
          console.log(products);
          this.products = products;
        });
  }

}
