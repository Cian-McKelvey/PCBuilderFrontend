import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUserId: string;
  currentUserEmail: string;
  currentUserToken: string;
  isUserLoggedIn: boolean;

  /*
  Variables are initialised in the constructor. Could just initialise them by setting values in
  the class scope, but I feel this adds some readability.
  */
  constructor() {
    this.currentUserId = '';
    this.currentUserEmail = '';
    this.currentUserToken = '';
    this.isUserLoggedIn = false;
  }

  // Collection of getters and setters for using the data
  setCurrentUserId(id: string): void {
    this.currentUserId = id;
  }

  getCurrentUserId(): string {
    return this.currentUserId;
  }

  setCurrentUserEmail(email: string): void {
    this.currentUserEmail = email;
  }

  getCurrentUserEmail(): string {
    return this.currentUserEmail;
  }

  setCurrentUserToken(token: string): void {
    this.currentUserToken = token;
  }

  getCurrentUserToken(): string {
    return this.currentUserToken;
  }

  setIsUserLoggedIn(status: boolean): void {
    this.isUserLoggedIn = status;
  }

  getIsUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

}
