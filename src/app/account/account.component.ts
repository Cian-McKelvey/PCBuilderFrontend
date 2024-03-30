import { Component } from '@angular/core';
import {UserService} from "../user.service";
import {WebService} from "../web.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(public userService: UserService, private webService: WebService, private router: Router) {}

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

}
