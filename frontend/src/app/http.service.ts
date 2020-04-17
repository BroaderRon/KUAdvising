import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {EnrollData,EnrollResData} from './checksheet/enrollSubmit'
import {CourseData} from './checksheet/courseSubmit'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  link = "http://127.0.0.1:5000/"
  getStudent() {
    return this.http.get(this.link + 'student')
  }
  getEnrolled(id){
    return this.http.get(this.link + 'enroll/' + id)
  }
  getCourse(dept,CourseNum){
    return this.http.get(this.link + 'course/' + dept+'/'+CourseNum)
  }
  postEnroll(postE: EnrollData){
    return this.http.post(this.link+ 'enroll', postE)
  }
  postCourse(postC: CourseData){
    return this.http.post(this.link+ 'course', postC)
  }
}