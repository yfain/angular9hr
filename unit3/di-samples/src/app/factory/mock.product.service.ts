import {Injectable} from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "./product";

@Injectable()
export class MockProductService implements ProductService {
  getProduct(): Product {
    return new Product('Samsung 7');
  }
}
