import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class QuestionService {

  constructor(private http: HttpClient) { }
  // endpoint = 'http://www.mocky.io/v2/5df0bab63100007b008f0a3c';
  endpoint = environment.backend_base_url + 'questions'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAllQuestions(): Observable<any> {
    console.log('this is the service')
    return this.http.get(this.endpoint)
  }

}
