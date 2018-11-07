import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from '../../services/person';
import { PersonService } from '../../services/person.service';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of as observableOf, Subject } from 'rxjs';
import { catchError, map, startWith, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-person-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  people: Person[] = [];
  selectedPerson: Person;

  private searchTerms = new Subject<string>();

  displayedColumns: string[] = ['createdAt', 'firstName', 'lastName', 'id'];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  term: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private personService: PersonService) {
  }

  ngOnInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    const debounceTerm = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      map(term => {
        this.term = term;
        return term;
      })
    );

    debounceTerm.subscribe(term => {
      if (this.paginator) {
        this.paginator.firstPage();
      }
    });

    merge(this.sort.sortChange, this.paginator.page, debounceTerm)
      .pipe(
        startWith({}),
        switchMap((data) => {
          this.isLoadingResults = true;
          let minIdx = this.paginator.pageIndex * this.paginator.pageSize;
          minIdx = isNaN(minIdx) ? 0 : minIdx;

          return this.personService.getPeople().pipe(
            map(people => {
              this.resultsLength = people.length;

              let filteredList = people;
              if (this.term) {
                filteredList = filteredList
                  .filter(person =>
                    person.firstName.toLocaleLowerCase().indexOf(this.term) > -1 ||
                    person.lastName.toLocaleLowerCase().indexOf(this.term) > -1
                  );
              }

              if (this.sort) {
                filteredList = filteredList
                  .sort((p1, p2) => {
                    const val1 = p1[this.sort.active];
                    const val2 = p2[this.sort.active];

                    if (val1 === val2) {
                      return 0;
                    }
                    if (val1 < val2) {
                      return this.sort.direction === 'asc' ? -1 : 1;
                    }

                    return this.sort.direction === 'asc' ? 1 : -1;

                  }
                  );
              }

              this.resultsLength = filteredList.length;

              return filteredList
                .filter((_, idx) =>
                  idx >= minIdx &&
                  idx - minIdx < this.paginator.pageSize
                );
            })
          );
          // this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          // this.resultsLength = data.length;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.people = data);
  }

  applyFilter(filterValue: string) {
    this.searchTerms.next(filterValue.trim().toLowerCase());
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
