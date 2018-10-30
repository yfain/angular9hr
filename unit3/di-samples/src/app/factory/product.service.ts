import {Injectable} from '@angular/core';
import {Product} from "./product"

@Injectable()
export class ProductService {
  getProduct(): Product {
    // Code making an HTTP request to get actual product details could go here
    return new Product('iPhone 7');
  }
}
