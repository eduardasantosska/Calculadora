import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Key } from '../../../../common/models/Key';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(public http: HttpClient) { }

  runAndSaveOperation(arrObj: Key[]): any {
    return this.http.post('http://localhost:12345/calculate', arrObj);
  }
}
