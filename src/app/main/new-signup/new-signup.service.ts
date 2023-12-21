import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NewSignUpService {

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get(environment.API_URL + 'api/adm_user/GetAllUsers');
  }

  getAllUsersWithType(){
    return this.http.get(environment.API_URL + 'api/adm_user/GetAllUsersWithType');
  }
  updateUser(payload: any){
    return this.http.put(environment.API_URL + 'api/adm_user/UpdateUser', payload);
  }

  getAllOccupancyType(){
    return this.http.get(environment.API_URL + 'api/OccupancyType/GetAllOccupancyType');
  }
} 
