import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  getIntended(){
    return this.http.get(environment.API_URL + 'api/Intended/GetIntended');
  }
} 
