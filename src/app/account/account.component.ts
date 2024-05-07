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

  showDeleteAccountForm: boolean = false;
  showUpdatePasswordForm: boolean = false;
  deleteAccountForm: any;
  updatePasswordForm: any;

  constructor(private formBuilder: FormBuilder, public userService: UserService,
              private webService: WebService, private router: Router) {}

  ngOnInit() {
    // Delete Account Form
    this.deleteAccountForm = this.formBuilder.group({
      // This checks if the user has typed the message indicating their wish to delete their account
      message: ['', [Validators.required, Validators.pattern('delete my account')]]
    });

    // Update Password Form
    this.updatePasswordForm = this.formBuilder.group({
      username: ['', Validators.required],
      oldPassword: ['', Validators.required],
      // Required length of 6 for the new password
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  logout() {
    const currentToken = this.userService.getCurrentUserToken();

    // Checks the token is present then calls logout endpoint
    if (currentToken) {
      this.webService.callLogout(currentToken).subscribe(
        (response) => {
          console.log('Logout successful:', response);

          // Clears all the userService properties, both for the service itself and in local storage
          this.userService.setIsUserLoggedIn(false);
          this.userService.setIsUserAdmin(false);
          this.userService.setCurrentUserId('');
          this.userService.setCurrentUserUsername('');
          this.userService.setCurrentUserToken('');
          this.userService.setCurrentUserCSRFToken('');

          // reroute home
          this.router.navigate(['/']);
          window.alert('You have been logged out');
        },
        (error) => {
          // Displays a failed logout message
          console.error('Logout error:', error);
          window.alert('Logout Failed: Please try again');
        }
      );
    }
    else {
      // Explains there was no token present
      console.error("LOGOUT ERROR, no valid token present");
      window.alert("LOGOUT ERROR, no valid token present");
    }
  }

  /*
    Methods below here are involved with the form validation, toggling of the form or submitting the form
    for the delete account functionality.
  */

  // Shows or hides the delete account form
  toggleDeleteAccountForm(): void {
    if (this.showUpdatePasswordForm) {
      this.toggleUpdatePasswordForm();
    }
    this.showDeleteAccountForm = !this.showDeleteAccountForm;
  }

  deleteIsInvalid(control: string): boolean {
    return this.deleteAccountForm.controls[control].invalid && this.deleteAccountForm.controls[control].touched;
  }

  deleteIsIncomplete(): boolean {
    const messageControl = this.deleteAccountForm.controls.message;
    return messageControl.invalid || messageControl.pristine || (messageControl.valid && !messageControl.touched);
  }

  // Called on delete account button press to facilitate account deletion
  deleteAccountSubmit(): void {
    const id = this.userService.getCurrentUserId();
    const token = this.userService.getCurrentUserToken();

    // Checks the status of id and token to see if the delete account endpoint can be called.
    if (id && token) {
      this.webService.callDeleteAccountEndpoint(id, token).subscribe(
        (response) => {
          console.log('Deletion successful:', response);
          window.alert('Account Deleted.');

          // Calls the logout function afterward to reset the application
          this.logout();
        },
        (error) => {
          // Notify user of a fail
          console.error('Deletion error:', error);
          window.alert('Deletion Failed: Please try again.');
        }
      );
    } else {
      console.error('Deletion error: Verify valid token or ID');
      window.alert('Deletion Failed: Verify Login Status');
    }
  }

  // Shows or hides the delete account form
  toggleUpdatePasswordForm(): void {
    if (this.showDeleteAccountForm) {
      this.toggleDeleteAccountForm();
    }
    this.showUpdatePasswordForm = !this.showUpdatePasswordForm;
  }

  updatePasswordSubmit(): void {
    const username = this.updatePasswordForm.value.username;
    const oldPassword = this.updatePasswordForm.value.oldPassword;
    const newPassword = this.updatePasswordForm.value.newPassword;
    const token = this.userService.getCurrentUserToken();

    // Checks for a present token
    if (token) {
      this.webService.callUpdateUserPasswordEndpoint(username, oldPassword, newPassword, token).subscribe(
        (response) => {
          console.log('Password updated:', response);
          window.alert('Password Updated.');

          // Calls the logout function afterward to reset the application
          this.logout();
        },
        (error) => {
          console.error('Password could not be updated:', error);
          window.alert('Password change failed, check current password and try again.');
        }
      );
    } else {
      console.error('Deletion error: Verify valid token');
      window.alert('Deletion Failed: Verify Login Status');
    }

  }

}
