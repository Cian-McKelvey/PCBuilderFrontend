import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateAccountComponent } from './create-account/create-account.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AccountComponent } from './account/account.component';
import { CreateNewBuildComponent } from './create-new-build/create-new-build.component';
import { FetchAllBuildsComponent } from './fetch-all-builds/fetch-all-builds.component';

const routes: any = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create-account',
    component: CreateAccountComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'all-builds',
    component: FetchAllBuildsComponent
  },
  {
    path: 'new-build',
    component: CreateNewBuildComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateAccountComponent,
    NavbarComponent,
    FooterComponent,
    AccountComponent,
    CreateNewBuildComponent,
    FetchAllBuildsComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule, // Allows Http requests
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        FormsModule,
        // Allows routing
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
