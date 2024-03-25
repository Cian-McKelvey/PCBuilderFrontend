import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {WebService} from "../web.service";
import {UserService} from "../user.service";
import {StorageService} from "../storage.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private formBuilder: FormBuilder, public webService: WebService,
              public userService: UserService, public storageService: StorageService) {}

  loginForm: any;

  ngOnInit() {
    // Login Form
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Handle Login Form Submission
  onLoginSubmit() {
    if (this.loginForm.valid) {

      // Calls the login endpoint using the form data
      this.webService.callLoginEndpoint(this.loginForm.value).subscribe(
        (data: any) => {

          // Access the token and user_id from the response
          const token = data.token;
          const userId = data.user_id;

          // Set current user username, password, token and user_id in the user service as well as login status
          this.userService.setCurrentUserUsername(this.loginForm.value.username);
          this.userService.setCurrentUserToken(token);
          this.userService.setCurrentUserId(userId);
          this.userService.setIsUserLoggedIn(true);

          window.alert("Login Successful");
        },
        (error) => {
          console.error('Error during login', error);
          window.alert("Login Failed, check username or password");
        }
      );
    }

  }

  isInvalidLogin(control: any): boolean {
    return this.loginForm.controls[control].invalid && this.loginForm.controls[control].touched;
  }


  logout() {
    const currentToken = this.userService.getCurrentUserToken();

    if (currentToken) {
      this.webService.callLogout(currentToken).subscribe(
        (response) => {
          // Handle successful logout
          console.log('Logout successful:', response);
          window.alert('Logout Successful!');

          this.userService.setIsUserLoggedIn(false);
          this.userService.setCurrentUserId("");
          this.userService.setCurrentUserUsername("");
          this.userService.setCurrentUserToken("");

          location.reload(); // Reloading everything refreshes all the pages and clears all the current user variables
        },
        (error) => {
          // Handle logout error
          console.error('Logout error:', error);
          window.alert('Logout Failed');
        }
      );
    }
    else {
      console.error("LOGOUT ERROR, no valid token present");
      window.alert("LOGOUT ERROR, no valid token present");
    }
  }

}
