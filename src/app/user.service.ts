import { Injectable } from '@angular/core';
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUserId: string;
  currentUserUsername: string;
  currentUserToken: string;
  isUserLoggedIn: boolean;
  isUserAdmin: boolean;
  userCSRFToken: string;

  /*
  Variables are initialised in the constructor. Could just initialise them by setting values in
  the class scope, but I feel this adds some readability.
  */
  constructor(public storageService: StorageService) {
    this.currentUserId = '';
    this.currentUserUsername = '';
    this.currentUserToken = '';
    this.userCSRFToken = '';
    this.isUserLoggedIn = false;
    this.isUserAdmin = false;
  }

  setCurrentUserCSRFToken(csrfToken: string): void {
    this.userCSRFToken = csrfToken;
    this.storageService.saveToLocalStorage("csrfToken", csrfToken);
  }

  getCurrentUserCSRFToken() : string | null {
    const currentCSRF = this.storageService.getFromLocalStorage("csrfToken");
    if (currentCSRF != null) {
      return currentCSRF;
    } else {
      return null;
    }
  }

  // Collection of getters and setters for using the data
  setCurrentUserId(id: string): void {
    this.currentUserId = id;
    this.storageService.saveToLocalStorage("ID", id)
  }

  getCurrentUserId(): string | null {
    const currentUserId = this.storageService.getFromLocalStorage("ID");
    if (currentUserId != null) {
      return currentUserId;
    } else {
      return null;
    }
  }

  setCurrentUserUsername(username: string): void {
    this.currentUserUsername = username;
    this.storageService.saveToLocalStorage("Username", username);
  }

  getCurrentUserUsername(): string | null {
    const currentUsername = this.storageService.getFromLocalStorage("Username");
    if (currentUsername != null) {
      return currentUsername;
    } else {
      return null;
    }
  }

  setCurrentUserToken(token: string): void {
    this.currentUserToken = token;
    this.storageService.saveToLocalStorage("Token", token);
  }

  getCurrentUserToken(): string | null {
    const currentToken = this.storageService.getFromLocalStorage("Token");
    if (currentToken != null) {
      return currentToken;
    } else {
      return null;
    }
  }

  setIsUserLoggedIn(status: boolean): void {
    this.isUserLoggedIn = status;
    this.storageService.saveToLocalStorage("isLoggedIn", status);
  }

  getIsUserLoggedIn(): boolean | null {
    const isLoggedInStatus = this.storageService.getFromLocalStorage("isLoggedIn");
    if (isLoggedInStatus != null) {
      return isLoggedInStatus;
    } else {
      return null;
    }
  }

  setIsUserAdmin(status: boolean): void {
    this.isUserAdmin = status;
    this.storageService.saveToLocalStorage("isUserAdmin", status);
  }

  getIsUserAdmin(): boolean | null {
    const isUserAdminStatus = this.storageService.getFromLocalStorage("isUserAdmin");
    if (isUserAdminStatus != null) {
      return isUserAdminStatus;
    } else {
      return null;
    }
  }

}
