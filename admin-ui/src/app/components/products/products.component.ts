import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import {  FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { ProductService } from '@services/product.service';
import { Error } from './products.error-util';

export interface Product {
  id: number,
  name: string,
  price: number,
  type: string,
  description: string,
  dateFirstAvailable: Date,
  available: boolean
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductsComponent implements OnInit {

    products: Product[];
    expandedElement: Product | null;
    displayedColumns: string[] = ['id', 'name', 'price', 'type', 'quantity'];
    dataSource: MatTableDataSource<any>;

    productForm: FormGroup;
    nameControl = new FormControl('', Validators.required);
    typeControl = new FormControl('', Validators.required);
    detailControl = new FormControl('');
    imageControl = new FormControl('');

    baseQuantityControl = new FormControl('', Validators.required);
    baseQuantityUnitControl = new FormControl('', Validators.required);
    baseQuantityPriceControl = new FormControl('', Validators.required);

    minQuantityControl = new FormControl('', Validators.required);
    maxQuantityControl = new FormControl('', Validators.required);

    stepControl = new FormControl('', Validators.required)
    isSchemePresentControl = new FormControl(false);
    schemesControl = new FormControl([]);
    schemes = [];
    submitted: boolean = false;
    kg = "1 kg";
    counter: number;
    srcResult: any;

    discountSchemes = [];
    isChecked = true;


    ngOnInit(): void {
        this.counter = 1;
        this.productForm = this.formBuilder.group({
                name: this.nameControl,
                type: this.typeControl,
                details: this.detailControl,
                image: this.imageControl,
                isSchemePresent: this.isSchemePresentControl,
                minQuantityControl: this.minQuantityControl,
                maxQuantityControl: this.maxQuantityControl,
                schemes: this.schemesControl
            });
        this.getAllProducts();

    }

    constructor(private product: ProductService,
                private formBuilder: FormBuilder,
                public error: Error) {}

    getErrorMessageN(erroneousControl) {
        console.log(erroneousControl, erroneousControl.hasError('required'))
    }

    getErrorMessage() {

        return "No error message specified";

      }

      onSubmit() {
          console.log(this.productForm.value);
      }



    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getAllProducts() {
      this.product.getAll()
          .subscribe(data => {
            console.log(data);
            this.products = data;
            this.dataSource = new MatTableDataSource(data);
          })
    }

    save(id, name, price, quantity) {
        console.log(id, name, price, quantity);
        this.product.update(id, name, price, quantity)
          .subscribe(res => {
            this.getAllProducts
          })
    }



    formatLabel(value: number) {
        if (value >= 1000) {
          return Math.round(value / 1000) + 'kg';
        }
        return value;
      }



      toggleScheme() {
//           console.log(this.schemeControl.value, this.schemeControl);
          if(this.isSchemePresentControl.value) {
              if (this.discountSchemes.length === 0) {
                  this.discountSchemes.push({id: this.counter++});
              }
           }
      }

      addScheme() {
          console.log("add clicked");
          this.discountSchemes.push({id: this.counter++});
      }

      deleteScheme(id) {
          this.discountSchemes.forEach(scheme => console.log(typeof scheme.id));
          let index = this.discountSchemes.findIndex(scheme => scheme.id === parseInt(id, 10));
          this.discountSchemes.splice(index, 1);

      }

      saveScheme(scheme) {
          this.schemes.push(scheme);
          this.schemesControl.value.push(scheme);
          console.log(this.schemes);
      }

      onFileSelected() {
        const inputNode: any = document.querySelector('#file');

        if (typeof (FileReader) !== 'undefined') {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            this.srcResult = e.target.result;
          };

          reader.readAsArrayBuffer(inputNode.files[0]);
        }
      }

}
