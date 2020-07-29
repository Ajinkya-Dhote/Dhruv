import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { BaseProduct } from "@models/BaseProduct";

@Injectable({
  providedIn: 'root'
})
export class BaseProductService {

  constructor(private http: HttpClient) { }


    getBaseProductList() {
        return this.http.get<BaseProduct[]>(environment.baseProductListUrl);
    }

    getProductListForBaseProduct(id) {
        // return this.http.get<any>(environment.getProductListForBaseProductUrl + `/${id}`);
        return this.http.get<any>(environment.getProductListForBaseProductUrl(id));
    }
}
