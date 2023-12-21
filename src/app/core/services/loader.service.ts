import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  allRequestComplete: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setLoader(value:any) {
    this.isLoading.next(value);
  }

  setRequest(value:any){
    this.allRequestComplete.next(value);
  }
}
