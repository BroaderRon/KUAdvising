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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChecksheetComponent,
    LoginComponent,
    RegisterComponent,
    CSComponent,
    ITComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
