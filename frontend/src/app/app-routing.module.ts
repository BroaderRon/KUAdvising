import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'; // Add this
import { CSComponent } from './checksheet/cs/cs.component'; // Add this
import { ITComponent } from './checksheet/it/it.component'; // Add this
import { ChecksheetComponent } from './checksheet/checksheet.component';


const routes: Routes = [
  { path: '', component: HomeComponent },              // Add this
  { path: 'checksheet', component: ChecksheetComponent } ,
  { path: 'checksheet/CS', component: CSComponent },           // Add this
  { path: 'checksheet/IT', component: ITComponent }           // Add this
];

@NgModule({
  //declarations: [ChecksheetComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }