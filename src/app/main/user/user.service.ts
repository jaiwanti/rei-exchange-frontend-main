import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private userDetails = new BehaviorSubject<any>(null);
  getUserDetails = this.userDetails.asObservable();

  setUserDetails(obj: any) {
    this.userDetails.next(obj);
  }

  getAllUsers() {
    return this.http.get(environment.API_URL + 'api/adm_user/GetAllUsers');
  }

  getAllUsersWithType() {
    return this.http.get(environment.API_URL + 'api/adm_user/GetAllUsersWithType');
  }
  updateUser(payload: any) {
    return this.http.put(environment.API_URL + 'api/adm_user/UpdateUser', payload);
  }
} 
