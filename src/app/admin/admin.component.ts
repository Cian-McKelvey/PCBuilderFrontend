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

  constructor(public webService: WebService, public userService: UserService, public router: Router) {}

  ngOnInit() {
    const adminStatus = this.userService.getIsUserAdmin();
    const currentToken = this.userService.getCurrentUserToken();
    // Checks for admin status and loads data if so
    if (adminStatus && currentToken) {
      this.webService.callAppDataEndpoint(currentToken)
        .subscribe(
          (data: any) => {
            console.log('Received admin app data:', data);
            this.appInfo = data.AppInfo;
          },
          (error) => {
            console.error('Error fetching app data:', error);
          }
        );
    }
  }

  returnHome() {
    this.router.navigate(['/']);
  }

  viewAllUsersPage() {
    this.router.navigate(['/admin/all-users']);
  }

}
