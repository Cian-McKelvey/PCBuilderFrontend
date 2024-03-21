import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WebService {

  // Passing the HttpClient to the constructor is what allows its use in the class
  constructor(private http: HttpClient) {}

  /*
    Endpoints for user functionality.
    Includes: Login, Logout, Create Account, Update Password, Delete Account
  */

  // Login
  callLoginEndpoint(loginData: any) {
    // Sets headers as basic auth is used to log in with backend
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${loginData.username}:${loginData.password}`)
    });

    return this.http.get('http://127.0.0.1:8000/api/v1.0/login', { headers });
  }

  // Calls the logout endpoint using the current users token
  callLogout(token: string) {
    const headers = new HttpHeaders().set('x-access-token', token);
    return this.http.get('http://127.0.0.1:8000/api/v1.0/logout', { headers });
  }

  callCreateAccountEndpoint(firstName: string, lastName: string, username: string, password: string) {
    let createForm = new FormData();
    createForm.append("first_name", firstName);
    createForm.append("last_name", lastName);
    createForm.append("username", username);
    createForm.append("password", password);

    return this.http.post('http://127.0.0.1:8000/api/v1.0/users/new', createForm)
  }

}
