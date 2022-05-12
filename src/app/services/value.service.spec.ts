
import { firstValueFrom } from 'rxjs';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    service = new ValueService();
  });

  it('should be create', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    // AAA
    it('Should return "my value"', () => {
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('Test for setValue', () => {
    // AAA
    it('Should change the value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
      expect(service.getValue()).toBe('change');
    });
  });

  describe('Test for getPromiseValue', () => {
    // AAA
    it('Should return "promise value" from promise', (doneFn) => {
      service.getPromiseValue()
      .then((value) => {
        // assert
        expect(value).toBe('my value');
        doneFn();
      });
    });

    it('Should return "promise value" from promise using async', async() => {
     const rta = await service.getPromiseValue();
     expect(rta).toBe('my value');
    });
  });

  describe('Test for getObservableValue', () => {
    it('Should return "my value"', (doneFn) => {
      service.getObservableValue()
      .subscribe((value) => {
        expect(value).toBe('my value');
        doneFn();
      });
    });
  });

  describe('Test for getObservableValue Sync', () => {
    it('Should return "my value"', async () => {
      const value = await firstValueFrom(service.getObservableValue());
      expect(value).toBe('my value');
    });
  });
});
