import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, defer  } from 'rxjs';
import { By } from '@angular/platform-browser';

import { ProductsComponent } from './products.component';
import { ProductComponent } from './../product/product.component';
import { ProductsService } from './../../services/product.service';
import { generateManyProducts } from './../../models/product.mock';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductsService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent ],
      providers: [
        { provide: ProductsService, useValue: spy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;

    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges(); //ngOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('test for getAllProducts()', () => {
    it('should return product list from service', () => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(of(productsMock));
      const countPrev = component.products.length;
      // Act
      component.getAllProducts();
      // TODO
      const expectedImg = fixture.debugElement.query(By.css('app-product img'));


      fixture.detectChanges();
      // Assert
      expect(component.products.length).toEqual(productsMock.length + countPrev);
      expect(component.products[0].images[0]).toEqual(expectedImg.nativeElement.src);
    });

    it('should change the status "loading" to "success"', fakeAsync(() => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));
      // Act
      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');

      tick(); // exec, obs, setTimeout, promise
      fixture.detectChanges();

      // Assert
      expect(component.status).toEqual('success');
    }));

    it('should change the status "loading" to "error"', fakeAsync(() => {
      // Arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(defer(() => Promise.reject('error')));
      // Act
      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');

      tick(4000); // exec, obs, setTimeout, promise
      fixture.detectChanges();

      // Assert
      expect(component.status).toEqual('error');
    }));
  });
});
