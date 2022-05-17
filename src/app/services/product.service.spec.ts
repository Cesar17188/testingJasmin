import { TestBed } from '@angular/core/testing';

import { ProductsService } from './product.service';

describe('ProductsService', () => {
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService
      ]
    });
    productsService = TestBed.inject(ProductsService);
  });

  it('should be create', () => {
    expect(productsService).toBeTruthy();
  })
});
