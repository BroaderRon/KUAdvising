import { Component, OnInit } from '@angular/core';
import { StudentData } from 'src/app/landing-page/StudentData';
import { DataService } from 'src/app/cur-user.service';
import { HttpService } from 'src/app/http.service';
import { LogData,LogRetData } from './LogData';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  message: StudentData;
  logs: Array<LogRetData>;
  LogStatus: boolean = false;
  newDATE: string; 
  log = new FormGroup({
    log1: new FormControl('')});

  constructor(private _http: HttpService, private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log(this.message.id)
    this._http.getLog(this.message.id).subscribe((ret: LogRetData)=>{
      let tmp = new Array<LogRetData>()
      for(let i in ret){
       tmp.push(ret[i])
      }
      tmp.sort((a, b) => (a.id < b.id) ? 1 : -1)
      this.logs = tmp;
      console.log(this.logs)
      this.newDATE = this.getDate()
      console.log(this.newDATE)
    });
    

  }
  newLog(){
    this.LogStatus = true;

  }
  getDate(){
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  if(dd<10) {
    dd='0'+dd;
} 

if(mm<10) {
    mm='0'+mm;
} 
  let newdate = yyyy+'-'+mm+'-'+dd;
  return newdate
  }
  submitLog(text:string){
    let temp = new LogData;
    temp.date= this.newDATE;
    temp.info = this.log.controls[text].value;
    console.log(this.log.controls[text].value);
    temp.sid = this.message.id;
    this._http.postLog(temp).subscribe((ret: LogRetData)=>{
      this.logs.push(ret);
      this.logs.sort((a, b) => (a.id < b.id) ? 1 : -1)
    })
    this.log.controls[text].setValue("")
    this.LogStatus = false;
  }

}
