import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dictionary: Record<string, any> = {};

  constructor(private http: HttpClient) { }

  public getDictionary(): Observable<Record<string, any>> {
    return this.http.get('assets/data/dictionary.json');
  }
}
