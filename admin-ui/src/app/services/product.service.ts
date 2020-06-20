import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any[]>("api/product/");
  }

  update(id, name, price, quantity) {
    console.log(id, name, price, quantity);
    return this.http.put("api/product/", {id, name, price, quantity});
  }
}
