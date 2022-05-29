import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be "Cesar"', () => {
    component.person = new Person('Cesar', 'Armendariz', 29, 120, 1.75);
    expect(component.person.name).toEqual('Cesar');
  });

  it('should have <p> with "Mi altura es {person.heigth}"</p>', () => {
    // Arrange
    component.person = new Person('Valentina', 'Armendariz', 29, 120, 1.75);
    const personDebug: DebugElement = fixture.debugElement;
    const expectedMsg = `Mi altura es ${component.person.heigth} cm`;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;
    // Act
    fixture.detectChanges();
    // Assert
    expect(pElement?.textContent).toContain(expectedMsg);
  });

  it('should have <h3> with "Hola, {person.name}"</h3>', () => {
    // Arrange
    component.person = new Person('Valentina', 'Armendariz', 29, 120, 1.75);
    const expectedMsg = `Hola, ${component.person.name}`;
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3: HTMLElement = h3Debug.nativeElement;
    // Act
    fixture.detectChanges();
    //Assert
    expect(h3?.textContent).toContain(expectedMsg);
  });

  it('should display a text with IMC when call calcIMC', () => {
    // Arrange
    const expectedMsg = 'overweigth level 3';
    component.person = new Person('Juan', 'Perez', 30, 120, 1.65); // overweight level 3
    const button = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement;
    // Act
    component.calcIMC();
    fixture.detectChanges();
    // Assert
    expect(button.textContent).toContain(expectedMsg);
  });

  it('should display a text with IMC when do click', () => {
    // Arrange
    const expectedMsg = 'overweigth level 3';
    component.person = new Person('Juan', 'Perez', 30, 120, 1.65); // overweight level 3
    const buttonDe = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonEl = buttonDe.nativeElement;
    // Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(buttonEl.textContent).toContain(expectedMsg);
  });

  it('should raise selected event when do click', () => {
    // Arrange
    const expectedPerson = new Person('Juan', 'Perez', 30, 120, 1.65);
    component.person = expectedPerson;
    const buttonDe = fixture.debugElement.query(By.css('button.btn-choose'));

    let selectedPerson: Person | undefined;
    component.onSelected
    .subscribe(person => selectedPerson = person);
    // Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Assert
    expect(selectedPerson).toEqual(expectedPerson);
  })

});


@Component({
  template: `<app-person
    [person]="person"
    (onSelected)="onSelected($event)"
  ></app-person>`,
})
class HostComponent {
  person = new Person('Cesar', 'Armendariz', 29, 120, 1.75);
  selectedPerson: Person | undefined;

  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

fdescribe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
