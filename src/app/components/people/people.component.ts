import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  people: Person[] = [
    new Person('Cesar', 'Armendariz', 29, 120, 1.79),
    new Person('Valentina', 'Armendariz', 12, 15, 1.1)
  ];
  selectedPerson: Person | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  choose(person: Person) {
    this.selectedPerson = person;
  }

}
