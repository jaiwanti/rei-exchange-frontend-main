import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  userLogin(login: any){
    return this.http.post(environment.API_URL + 'api/Login/LoginDetails', login);
  }

  addUser(payload: any){
    return this.http.post(environment.API_URL + 'api/adm_user/AddUser', payload);
  }
}
