import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {WebService} from "../web.service";
import {UserService} from "../user.service";
import {StorageService} from "../storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private formBuilder: FormBuilder, public webService: WebService,
              public userService: UserService, public storageService: StorageService,
              public router: Router) {}

  loginForm: any;

  ngOnInit() {
    // Login Form validators, ensure both fields are entered
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
          const adminStatus = data.is_admin;

          // Set current user username, password, token and user_id in the user service as well as login status
          this.userService.setCurrentUserUsername(this.loginForm.value.username);
          this.userService.setCurrentUserToken(token);
          this.userService.setCurrentUserId(userId);
          this.userService.setIsUserLoggedIn(true);
          this.userService.setIsUserAdmin(adminStatus);

          console.log("Login Successful")
          window.alert("Login Successful");

          // Once logged in, the complete list of PC Parts can be fetched
          const currentToken = this.userService.getCurrentUserToken();
          if (currentToken) {
            this.webService.callFetchAllPartsEndpoint(currentToken)
              .toPromise()
              .then((response: any) => {
                // Fetch the parts list from the response, add a small bit of preprocessing and save to local storage
                // After saving all this data to local storage the complete data stored is around 150kb.
                // This is considered acceptable
                const completePartsArray = response.parts;
                this.storageService.saveToLocalStorage('PartsArray', completePartsArray);
                console.log('Parts loaded to local storage!');
              })
              .catch((error) => {
                console.log('Error fetching parts:', error);
              });
          } else {
            console.log("Complete parts list could not be fetched.");
          }

        },
        (error) => {
          console.error('Error during login', error);
          window.alert("Login Failed, check username or password");
        }
      );
    }

  }

  // Keeps an eye on the form to detect wrong inputs etc...
  isInvalidLogin(control: any): boolean {
    return this.loginForm.controls[control].invalid && this.loginForm.controls[control].touched;
  }

  // Allows the user to navigate to the admin page if admin status is present
  goToAdminPage(){
    this.router.navigate(['/admin']);
  }
}
