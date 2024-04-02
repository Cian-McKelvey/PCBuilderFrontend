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
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${loginData.username}:${loginData.password}`)
    });

    return this.http.get('http://127.0.0.1:8000/api/v1.0/login', { headers });
  }

  // Calls the logout endpoint using the current users token
  callLogout(token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('x-access-token', token);
    return this.http.get('http://127.0.0.1:8000/api/v1.0/logout', { headers });
  }

  callCreateAccountEndpoint(firstName: string, lastName: string, username: string, password: string) {
    let createForm: FormData = new FormData();
    createForm.append("first_name", firstName);
    createForm.append("last_name", lastName);
    createForm.append("username", username);
    createForm.append("password", password);

    return this.http.post('http://127.0.0.1:8000/api/v1.0/users/new', createForm)
  }

  callUpdateUserPasswordEndpoint(username: string, oldPassword: string, newPassword: string, token: string) {
    let updateForm: FormData = new FormData();
    const headers: HttpHeaders = new HttpHeaders().set('x-access-token', token);
    updateForm.append("username", username);
    updateForm.append("old_password", oldPassword);
    updateForm.append("new_password", newPassword);

    return this.http.put('http://127.0.0.1:8000/api/v1.0/users/edit/password', updateForm, { headers });
  }

  callDeleteAccountEndpoint(id: string, token: string) {
    const deleteURL: string = 'http://127.0.0.1:8000/api/v1.0/users/' + id + '/delete';
    const headers: HttpHeaders = new HttpHeaders().set('x-access-token', token);

    return this.http.delete(deleteURL, { headers });
  }

  callFetchAllPartsEndpoint(token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('x-access-token', token);
    return this.http.get('http://127.0.0.1:8000/api/v1.0/parts/fetch_all', { headers });
  }

  callCreateNewBuildEndpoint(build_price: string, token: string, userID: string) {
    const headers: HttpHeaders = new HttpHeaders()
      .set('x-access-token', token)
      .set('x-user-id', userID);
    const data = {'price': build_price};

    return this.http.post('http://127.0.0.1:8000/api/v1.0/builds/new', data, { headers });
  }

  callEditBuildEndpoint(partType: string, partName: string, partPrice: number, token: string, buildID: string) {
    const url: string = "http://127.0.0.1:8000/api/v1.0/builds/" + buildID + "/edit";
    const headers: HttpHeaders = new HttpHeaders().set('x-access-token', token);

    const editData = {
      "part_type": partType,
      "new_part": {
        "part_name": partName,
        "price": partPrice
      }
    };

    return this.http.put(url, editData, { headers });
  }

  callFetchAllBuildsEndpoint(token: string, userID: string) {
    const headers: HttpHeaders = new HttpHeaders()
      .set('x-access-token', token)
      .set('x-user-id', userID);

    return this.http.get('http://127.0.0.1:8000/api/v1.0/builds/fetch_all', { headers });
  }

}
