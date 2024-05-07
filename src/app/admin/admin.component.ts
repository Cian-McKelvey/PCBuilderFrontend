import { Component } from '@angular/core';
import {WebService} from "../web.service";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  appInfo: any;  // Holds the admin app data if there is any
  isAppInfoLoaded: boolean = false; // Remains false until app data is loaded, allows controls in html

  constructor(public webService: WebService, public userService: UserService, public router: Router) {}

  ngOnInit() {
    const adminStatus = this.userService.getIsUserAdmin();
    const currentToken = this.userService.getCurrentUserToken();
    // Checks for admin status and loads application data if so
    if (adminStatus && currentToken) {
      this.webService.callAppDataEndpoint(currentToken)
        .subscribe(
          (data: any) => {
            // Adds app info to the variables, and changes the boolean to true so it can be displayed
            this.appInfo = data.AppInfo;
            this.isAppInfoLoaded = true;
          },
          (error) => {
            console.error('Error fetching app data:', error);
          }
        );
    } else {
      console.log("No admin status detected");
      window.alert("No admin status detected");
    }
  }

  // Returns the app to the homepage
  returnHome() {
    this.router.navigate(['/']);
  }

  // Navigates the app on to the view all users admin section
  viewAllUsersPage() {
    this.router.navigate(['/admin/all-users']);
  }

}
