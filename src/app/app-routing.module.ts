import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'; // Add this
import { CSComponent } from './checksheet/cs/cs.component'; // Add this
import { ITComponent } from './checksheet/it/it.component'; // Add this
import { ChecksheetComponent } from './checksheet/checksheet.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import { OktaCallbackComponent } from '@okta/okta-angular'
import { OktaAuthGuard } from '@okta/okta-angular';
import { LogComponent } from './checksheet/log/log.component';

const CALLBACK_PATH = 'implicit/callback';
const routes: Routes = [
  {path: CALLBACK_PATH, component: OktaCallbackComponent},
  { path: '', component: HomeComponent },              // Add this
  { path: 'checksheet', component: ChecksheetComponent, canActivate: [ OktaAuthGuard ]} ,
  { path: 'checksheet/CS', component: CSComponent, canActivate: [ OktaAuthGuard ]  },
  { path: 'checksheet/IT', component: ITComponent, canActivate: [ OktaAuthGuard ]  },
  { path: 'landing', component: LandingPageComponent, canActivate: [ OktaAuthGuard ] },
  { path: 'checksheet/log', component: LogComponent, canActivate: [ OktaAuthGuard ] },        // Add this           // Add this
];

@NgModule({
  //declarations: [ChecksheetComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }