import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  userLogin(login: any) {
    return this.http.post(environment.API_URL + 'api/Login/LoginDetails', login);
  }

  addUserLLCs(payload: any) {
    return this.http.post(environment.API_URL + 'api/LLCs/AddUserLLCs', payload);
  }

  addUserLendingInstitution(payload: any) {
    return this.http.post(environment.API_URL + 'api/LendingInstitution/AddUserLendingInstitution', payload);
  }

  addUserInsuranceAgency(payload: any) {
    return this.http.post(environment.API_URL + 'api/InsuranceAgency/AddUserInsuranceAgency', payload);
  }

  getLLCsByUserId(userid: number) {
    return this.http.get(environment.API_URL + 'api/LLCs/GetLLCsByUserId/' + userid);
  }

  getLendingInstitutionByUserId(userid: number) {
    return this.http.get(environment.API_URL + 'api/LendingInstitution/GetLendingInstitutionByUserId/' + userid);
  }

  getInsuranceAgencyByUserId(userid: number) {
    return this.http.get(environment.API_URL + 'api/InsuranceAgency/GetInsuranceAgencyByUserId/' + userid);
  }

  addPropertyDetails(payload: any) {
    return this.http.post(environment.API_URL + 'api/PropertyDetails/AddPropertyDetails', payload);
  }

  getPropertyDetailsByUserId(payload: any) {
    return this.http.get(environment.API_URL + 'api/PropertyDetails/GetPropertyDetailsByUserId?userid=' + payload.userId + "&pageNumber=" + payload.pageNumber + "&pageSize=" + payload.pageSize + "&search=" + payload.search);
  }

  getAllPropertyDetails() {
    return this.http.get(environment.API_URL + 'api/PropertyDetails/GetAllPropertyDetails');
  }
}
