import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Person } from 'src/app/services/person';
import { PersonService } from 'src/app/services/person.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-person-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  people$: Observable<Person[]>;
  private searchTerms = new Subject<string>();

  constructor(private personService: PersonService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.people$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.personService.searchPeople(term)),
    );
  }

}
