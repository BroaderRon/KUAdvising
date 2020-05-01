import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChecksheetComponent } from './checksheet/checksheet.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CSComponent } from './checksheet/cs/cs.component';
import { ITComponent } from './checksheet/it/it.component';
import {OKTA_CONFIG, OktaAuthModule,} from '@okta/okta-angular';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LogComponent } from './checksheet/log/log.component';

const config = {
  clientId: '0oaagw6yfRobu1uwU4x6',
  issuer: 'https://dev-855821.okta.com/oauth2/default',
  redirectUri: 'https://kuadvfrontend.herokuapp.com/implicit/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChecksheetComponent,
    LoginComponent,
    RegisterComponent,
    CSComponent,
    ITComponent,
    LandingPageComponent,
    LogComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: config }],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
