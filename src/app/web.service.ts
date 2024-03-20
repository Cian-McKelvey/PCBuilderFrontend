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
    // Set headers with Authorization
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${loginData.username}:${loginData.password}`)
    });

    return this.http.get('http://127.0.0.1:8000/api/v1.0/login', { headers });
  }

}
