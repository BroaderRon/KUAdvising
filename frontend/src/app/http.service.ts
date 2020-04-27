import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {EnrollData,EnrollResData} from './checksheet/enrollSubmit'
import {CourseData} from './checksheet/courseSubmit'
import { AdivsorData } from './landing-page/AdvisorData';
import { StudentData } from './landing-page/StudentData';
import { StuArr } from './home/StuArr';
import { LogData } from './checksheet/log/LogData';

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
  putEnroll(putE: EnrollData, oldE: EnrollData){
    
    return this.http.put(this.link+ 'enroll/' + oldE.sid + '/' + oldE.Dept+ '/' + oldE.CourseNum, putE)
  }
  getAdvisor(email: String) {
    return this.http.get(this.link + 'advisor/'+ email)
  }
  postAdvisor(postA: AdivsorData){
    return this.http.post(this.link+ 'advisor', postA)
  }
  getStudentA(email: String) {
    return this.http.get(this.link + 'studentA/'+ email)
  }
  postStudent(postS: StudentData){
    return this.http.post(this.link+ 'student', postS)
  }
  getLog(sid: number) {
    return this.http.get(this.link + 'log/'+ sid)
  }
  postLog(log: LogData){
    return this.http.post(this.link+ 'log', log)
  }
}
