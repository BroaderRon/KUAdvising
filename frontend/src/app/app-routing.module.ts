import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'; // Add this
import { ChecksheetComponent } from './checksheet/checksheet.component'; // Add this


const routes: Routes = [
  { path: '', component: HomeComponent },              // Add this
  { path: 'checksheet', component: ChecksheetComponent }           // Add this
];

@NgModule({
  //declarations: [ChecksheetComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }