import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../cur-user.service";

@Component({
  selector: 'app-checksheet',
  templateUrl: './checksheet.component.html',
  styleUrls: ['./checksheet.component.css']
})

export class ChecksheetComponent implements OnInit {
  constructor(private data: DataService) { }

  message;

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)

  }

}
