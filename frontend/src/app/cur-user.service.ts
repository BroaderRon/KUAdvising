import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StudentData } from './landing-page/StudentData';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject(new StudentData);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message) {
    this.messageSource.next(message)
  }

}
