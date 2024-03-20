import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import { CreateAccountComponent } from './create-account/create-account.component';

const routes: any = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create-account',
    component: CreateAccountComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Allows Http requests
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    // Allows routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
