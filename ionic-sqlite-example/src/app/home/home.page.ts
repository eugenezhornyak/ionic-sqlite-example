import { Component } from '@angular/core';
import { Product } from '../core/models/product';
import { ProductsRepositoryService } from '../core/services/products.repository.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public products: Promise<Array<Product>>;

  constructor(
    private productsRepository: ProductsRepositoryService
  ) {
    this.refreshData();
  }

  private refreshData() {
    this.products = this.productsRepository.readAll();
  }
}
