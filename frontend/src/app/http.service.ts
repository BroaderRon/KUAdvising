import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  link = "http://127.0.0.1:5000/"
  getStudent() {
    return this.http.get(this.link + 'student')
  }
  getEnrolled(id:string){
    return this.http.get(this.link + 'enroll/' + id)
  }
}