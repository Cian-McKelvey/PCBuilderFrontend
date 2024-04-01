import { Component } from '@angular/core';
import {UserService} from "../user.service";
import {WebService} from "../web.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  showDeleteAccountForm = false;
  deleteAccountForm: any;

  constructor(private formBuilder: FormBuilder, public userService: UserService, private webService: WebService, private router: Router) {}

  ngOnInit() {
    this.deleteAccountForm = this.formBuilder.group({
      // This checks if the user has typed the message indicating their wish to delete their account
      message: ['', [Validators.required, Validators.pattern('delete my account')]]
    });
  }

  logout() {
    const currentToken = this.userService.getCurrentUserToken();

    if (currentToken) {
      this.webService.callLogout(currentToken).subscribe(
        (response) => {
          // Handle successful logout
          console.log('Logout successful:', response);

          this.userService.setIsUserLoggedIn(false);
          this.userService.setCurrentUserId('');
          this.userService.setCurrentUserUsername('');
          this.userService.setCurrentUserToken('');

          // reroute home
          this.router.navigate(['/']);
          window.alert('Logout Successful!');
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

  toggleDeleteAccountForm() {
    this.showDeleteAccountForm = !this.showDeleteAccountForm;
  }

  deleteAccountSubmit() {
    console.log(this.deleteAccountForm);
  }

  deleteIsInvalid(control: string): boolean {
    return this.deleteAccountForm.controls[control].invalid && this.deleteAccountForm.controls[control].touched;
  }

  deleteIsUntouched(): boolean {
    return this.deleteAccountForm.controls.message.pristine;
  }

  deleteIsIncomplete(): boolean {
    return this.deleteIsInvalid('message') || this.deleteIsUntouched();
  }

}
