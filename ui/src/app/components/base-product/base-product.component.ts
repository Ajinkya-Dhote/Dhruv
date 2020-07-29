import { Component, OnInit, Input } from '@angular/core';
import { BaseProduct } from "@models/BaseProduct";
import { MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { QuantitySelectComponent } from '@reusable-components/quantity-select/quantity-select.component';
import { BaseProductService } from '@services/base-product.service';

@Component({
  selector: 'app-base-product',
  templateUrl: './base-product.component.html',
  styleUrls: ['./base-product.component.scss']
})
export class BaseProductComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet,
              private service: BaseProductService) { }

  @Input('base-product') baseProduct: BaseProduct;


  ngOnInit(): void {}

  openBottomSheet(id): void {

      this.service.getProductListForBaseProduct(id)
            .subscribe(data => {
                this._bottomSheet.open(QuantitySelectComponent, {
                    data: data
                });
            });
        }


}
