import { Component, OnInit } from '@angular/core';
import { Person } from '../../services/person';
import { PersonService } from '../../services/person.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  people: Person[];
  selectedPerson: Person;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.getPeople();
  }

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }

  getPeople(): void {
    this.personService
      .getPeople()
      .subscribe(people => this.people = people);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.personService.addPerson({ name } as Person)
      .subscribe(hero => {
        this.people.push(hero);
      });
  }

  delete(people: Person): void {
    this.people = this.people.filter(h => h !== people);
    this.personService.deletePerson(people).subscribe();
  }
}
