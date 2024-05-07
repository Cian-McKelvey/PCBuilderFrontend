import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


/**
 * Service class that handles HTTP requests to the backend API.
 */
@Injectable({
  providedIn: 'root'
})
export class WebService {

  // Passing the HttpClient to the constructor is what allows its use in the class
  constructor(private http: HttpClient) {}

  /**
   * Fetches a CSRF token from the backend API.
   * @returns Observable representing the HTTP response.
   */
  callCSRFTokenEndpoint() {
    return this.http.get('http://127.0.0.1:8000/api/v1.0/csrf-token');
  }


  /*
    Endpoints for user functionality.
    Includes: Login, Logout, Create Account, Update Password, Delete Account
  */

  /**
   * Calls the login endpoint with the provided login data.
   * @param loginData - An object containing the username and password.
   * @returns Observable representing the HTTP response.
   */
  callLoginEndpoint(loginData: any) {
    // Sets headers as basic auth is used to log in with backend
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${loginData.username}:${loginData.password}`)
    });

    return this.http.get('http://127.0.0.1:8000/api/v1.0/login', { headers });
  }

  /**
   * Calls the logout endpoint with the provided user token.
   * @param token - The user's JWT token.
   * @returns Observable representing the HTTP response.
   */
  callLogout(token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('x-access-token', token);
    return this.http.get('http://127.0.0.1:8000/api/v1.0/logout', { headers });
  }

  /**
   * Calls the endpoint to create a new account.
   * @param username - The username for the new account.
   * @param password - The password for the new account.
   * @returns Observable representing the HTTP response.
   */
  callCreateAccountEndpoint(username: string, password: string) {
    let createForm: FormData = new FormData();
    createForm.append("username", username);
    createForm.append("password", password);

    return this.http.post('http://127.0.0.1:8000/api/v1.0/users/new', createForm)
  }

  /**
   * Calls the endpoint to update a user's password.
   * @param username - The username of the user.
   * @param oldPassword - The user's current password.
   * @param newPassword - The new password to set.
   * @param token - The user's JWT token.
   * @returns Observable representing the HTTP response.
   */
  callUpdateUserPasswordEndpoint(username: string, oldPassword: string, newPassword: string, token: string) {
    let updateForm: FormData = new FormData();
    const headers: HttpHeaders = new HttpHeaders().set('x-access-token', token);
    updateForm.append("username", username);
    updateForm.append("old_password", oldPassword);
    updateForm.append("new_password", newPassword);

    return this.http.put('http://127.0.0.1:8000/api/v1.0/users/edit/password', updateForm, { headers });
  }

  /**
   * Calls the endpoint to delete a user's account.
   * @param id - The ID of the user to delete.
   * @param token - The user's JWT token.
   * @returns Observable representing the HTTP response.
   */
  callDeleteAccountEndpoint(id: string, token: string) {
    const deleteURL: string = 'http://127.0.0.1:8000/api/v1.0/users/' + id + '/delete';
    const headers: HttpHeaders = new HttpHeaders().set('x-access-token', token);

    return this.http.delete(deleteURL, { headers });
  }

  /**
   * Calls the endpoint to fetch all available parts.
   * @param token - The user's JWT token.
   * @returns Observable representing the HTTP response.
   */
  callFetchAllPartsEndpoint(token: string) {
    const headers: HttpHeaders = new HttpHeaders().set('x-access-token', token);
    return this.http.get('http://127.0.0.1:8000/api/v1.0/parts/fetch_all', { headers });
  }

  /**
   * Calls the endpoint to create a new build.
   * @param build_price - The price of the new build.
   * @param token - The user's JWT token.
   * @param userID - The ID of the user creating the build.
   * @returns Observable representing the HTTP response.
   */
  callCreateNewBuildEndpoint(build_price: string, token: string, userID: string) {
    const headers: HttpHeaders = new HttpHeaders()
      .set('x-access-token', token)
      .set('x-user-id', userID);
    const data = {'price': build_price};

    return this.http.post('http://127.0.0.1:8000/api/v1.0/builds/new', data, { headers });
  }

  /**
   * Calls the endpoint to edit a build by adding or replacing a part.
   * @param partType - The type of the part to edit (e.g., CPU, GPU).
   * @param partName - The name of the new part.
   * @param partPrice - The price of the new part.
   * @param token - The user's JWT token.
   * @param buildID - The ID of the build to edit.
   * @returns Observable representing the HTTP response.
   */
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

  /**
   * Calls the endpoint to update a build with a new complete build.
   * @param buildDict - An object containing the new parts for the build.
   * @param buildID - The ID of the build to update.
   * @param token - The user's JWT token.
   * @returns Observable representing the HTTP response.
   */
  callUpdateBuildEndpoint(buildDict: {}, buildID: string, token: string) {
    const url: string = "http://127.0.0.1:8000/api/v1.0/builds/" + buildID + "/replace";
    const headers: HttpHeaders = new HttpHeaders().set('x-access-token', token);

    return this.http.put(url, buildDict, { headers });
  }

  /**
   * Calls the endpoint to fetch all builds created by a user.
   * @param token - The user's JWT token.
   * @param userID - The ID of the user whose builds to fetch.
   * @returns Observable representing the HTTP response.
   */
  callFetchAllBuildsEndpoint(token: string, userID: string) {
    const headers: HttpHeaders = new HttpHeaders()
      .set('x-access-token', token)
      .set('x-user-id', userID);

    return this.http.get('http://127.0.0.1:8000/api/v1.0/builds/fetch_all', { headers });
  }


  /**
   * Calls the endpoint to delete a build.
   * @param userID - The ID of the user who owns the build.
   * @param buildID - The ID of the build to delete.
   * @param token - The user's JWT token.
   * @returns Observable representing the HTTP response.
   */
  callDeleteBuildEndpoint(userID: string, buildID: string, token: string) {
    const url = "http://127.0.0.1:8000/api/v1.0/builds/" + buildID + "/delete";
    const headers: HttpHeaders = new HttpHeaders()
      .set("x-access-token", token)
      .set("x-user-id", userID);

    return this.http.delete(url,{ headers });
  }

  /*
    ADMIN ENDPOINT CALLS
  */


  /**
   * Calls the endpoint to fetch all site information.
   * @param token - The user's JWT token.
   * @returns Observable representing the HTTP response.
   */
  callAppDataEndpoint(token: string) {
    const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
    return this.http.get('http://127.0.0.1:8000/api/v1.0/admin/app-data', { headers })
  }


  /**
   * Calls the endpoint that fetches a list of all site users.
   * @param token - The user's JWT token.
   * @returns Observable representing the HTTP response.
   */
  callFetchAllUsersEndpoint(token: string) {
    const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);
    return this.http.get('http://127.0.0.1:8000/api/v1.0/admin/fetch-all-users', { headers })
  }


  /**
   * Calls the endpoint to delete another user as an admin.
   * @param userID - The ID of the user to be deleted.
   * @param token - The user's JWT token.
   * @returns Observable representing the HTTP response.
   */
  callAdminDeleteUserEndpoint(token: string, userID: string) {
    const url: string = "http://127.0.0.1:8000/api/v1.0/admin/delete-user/" + userID;
    const headers: HttpHeaders = new HttpHeaders().set("x-access-token", token);

    return this.http.delete(url, { headers });
  }

}
