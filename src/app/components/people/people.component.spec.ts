import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Person } from 'src/app/models/person.model';
import { PersonComponent } from '../person/person.component';
import { By } from '@angular/platform-browser';
import { PeopleComponent } from './people.component';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components', () => {
    // Arrange
    component.people = [
      new Person('Cesar', 'Armendariz', 29, 120, 1.79),
      new Person('Valentina', 'Armendariz', 12, 15, 1.1),
      new Person('Richard', 'Armendariz', 25, 1.5, 1.1),
    ];
    // Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    // Assert
    expect(debugElement.length).toEqual(3);
  });
});
