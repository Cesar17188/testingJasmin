import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './product.service';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { generateManyProducts, generateOneProduct } from '../models/product.mock';
import { environment } from '../../environments/environment';

fdescribe('ProductsService', () => {
  let productsService: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ProductsService
      ]
    });
    productsService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be create', () => {
    expect(productsService).toBeTruthy();
  });

  describe('tests for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(2);
      //Act
      productsService.getAllSimple()
      .subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });
  });

  describe('tests for getAll', () => {
    it('should return a product list', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      //Act
      productsService.getAll()
      .subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);

        doneFn();
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should return product list width taxes', (doneFn) => {
      // Arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, //100 * .19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, //200 * .19 = 38
        },
        {
          ...generateOneProduct(),
          price: 0, //0 * .19 = 0
        },
        {
          ...generateOneProduct(),
          price: -100, // = 0
        },
      ];
      //Act
      productsService.getAll()
      .subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });
       //http config
       const url = `${environment.API_URL}/api/v1/products`;
       const req = httpController.expectOne(url);
       req.flush(mockData);
    });

    it('should send query params width limit 10 offset 0', (doneFn) => {
      //Arrange
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 0;
      //Act
      productsService.getAll(limit, offset)
      .subscribe((data) => {
        //Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      //http config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
    });
  });

  describe('test for create', () => {
      it('should return a new product', (doneFn) => {
        // Arrange
        const mockData = generateOneProduct();
        const dto: CreateProductDTO = {
          title: 'new Product',
          price: 100,
          images: ['img'],
          description: 'bla bla bla',
          categoryId: 12,
        };
        // Act
        productsService.create({...dto}).subscribe((data) => {
          // Assert
          expect(data).toEqual(mockData);
          doneFn();
        });
        //http config
        const url = `${environment.API_URL}/api/v1/products`;
        const req = httpController.expectOne(url);
        req.flush(mockData);
        expect(req.request.body).toEqual(dto);
        expect(req.request.method).toEqual('POST');
      });
  });

    describe('test for update', () => {
      it('should return an updated product', (doneFn) => {
        // Arrange
        const mockData = generateOneProduct();
        const id = '1';
        const dto: UpdateProductDTO = {
          title: 'update Product'
        };
        // Act
        productsService.update(id, {...dto}).subscribe((data) => {
          // Assert
          expect(data).toEqual(mockData);
          doneFn();
        });
        //http config
        const url = `${environment.API_URL}/api/v1/products/${id}`;
        const req = httpController.expectOne(url);
        req.flush(mockData);
        expect(req.request.body).toEqual(dto);
        expect(req.request.method).toEqual('PUT');
      });
  });

    describe('test for delete', () => {
      it('should delete a product', (doneFn) => {
        // Arrange
        const id = '1';
        // Act
        productsService.delete(id).subscribe((data) => {
          // Assert
          expect(data).toBe(true);
          doneFn();
        });
        //http config
        const url = `${environment.API_URL}/api/v1/products/${id}`;
        const req = httpController.expectOne(url);
        req.flush(true);
        expect(req.request.method).toEqual('DELETE');
      });
  });
});
