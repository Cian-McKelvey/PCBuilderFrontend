import {ChangeDetectorRef, Component} from '@angular/core';
import {WebService} from "../web.service";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css']
})
export class ViewAllUsersComponent {

  userAccounts: any;  // Holds the users that are fetched
  pageNum: number = 1;  // Pagination control variable
  areUsersFetched: boolean = false;

  constructor(public webService: WebService,
              public userService: UserService,
              public router: Router, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const adminStatus = this.userService.getIsUserAdmin();
    const currentToken = this.userService.getCurrentUserToken();
    // Checks for admin status and loads data if so
    if (adminStatus && currentToken) {
      this.webService.callFetchAllUsersEndpoint(currentToken)
        .subscribe(
          (data: any) => {
            console.log('All users have been fetched', data);
            this.userAccounts = data.users;
            console.log("user accounts fetched");
            this.areUsersFetched = true;

            // Manually trigger change detection to update the UI
            this.cdr.detectChanges();
          },
          (error) => {
            console.error('Error fetching app data:', error);
          }
        );
    }
  }

  returnHome(): void {
    this.router.navigate(['/']);
  }

  returnToAdmin(): void {
    this.router.navigate(['/admin']);
  }

  adminDeleteUser(userID: string): void {
    const token = this.userService.getCurrentUserToken();
    if (token) {
      this.webService.callAdminDeleteUserEndpoint(token, userID).subscribe(
        (response) => {
          console.log('User deleted successfully:', response);
          window.alert("User Deleted Successfully!");
          location.reload();
        },
        (error) => {
          console.error('Error deleting user:', error);
          window.alert("Error deleting the user.")
        }
      );
    }
  }
}
