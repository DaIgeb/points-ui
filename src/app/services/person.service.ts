import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person } from './person';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MessageService } from './message.service';
import { catchError, tap, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private peopleUrl = 'https://api.aws.daigeb.ch/people'; // 'api/people';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  public getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.peopleUrl, httpOptions).pipe(
      tap(_ => this.log('fetched people')),
      catchError(this.handleError('getPeople', []))
    );
  }

  public getPerson(id: string): Observable<Person> {
    const url = `${this.peopleUrl}/${id}`;
    return this.http.get<Person>(url, httpOptions).pipe(
      tap(_ => this.log(`fetched person id=${id}`)),
      catchError(this.handleError<Person>(`getPerson id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchPeople(term: string): Observable<Person[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    const options = term ?
      { params: new HttpParams().set('name', term) } : {};

    return this.http.get<Person[]>(`${this.peopleUrl}`, options).pipe(
      tap(_ => this.log(`found people matching "${term}"`)),
      catchError(this.handleError<Person[]>('searchPeople', []))
    );
  }

  /** PUT: update the person on the server */
  updatePerson(person: Person): Observable<any> {
    return this.http.put(this.peopleUrl, person, httpOptions).pipe(
      tap(_ => this.log(`updated person id=${person.id}`)),
      catchError(this.handleError<any>('updatePerson'))
    );
  }

  /** POST: add a new person to the server */
  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.peopleUrl, person, httpOptions).pipe(
      tap((postedPerson: Person) => this.log(`added person w/ id=${postedPerson.id}`)),
      catchError(this.handleError<Person>('addPerson'))
    );
  }

  /** DELETE: delete the person from the server */
  deletePerson(person: Person | number): Observable<Person> {
    const id = typeof person === 'number' ? person : person.id;
    const url = `${this.peopleUrl}/${id}`;

    return this.http.delete<Person>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted person id=${id}`)),
      catchError(this.handleError<Person>('deletePerson'))
    );
  }

  private log(message: string) {
    this.messageService.add(`PersonService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
