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
    this.storageService.saveToLocalStorage("MyVariable", "StoredData");
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

}
