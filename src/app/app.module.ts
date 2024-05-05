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
import {NgxPaginationModule} from "ngx-pagination";
import { AdminComponent } from './admin/admin.component';
import { ViewAllUsersComponent } from './view-all-users/view-all-users.component';

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
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin/all-users',
    component: ViewAllUsersComponent
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
    FetchAllBuildsComponent,
    AdminComponent,
    ViewAllUsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
