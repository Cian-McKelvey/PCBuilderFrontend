import {ChangeDetectorRef, Component} from '@angular/core';
import {Subscription} from "rxjs";
import {WebService} from "../web.service";
import {UserService} from "../user.service";
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-fetch-all-builds',
  templateUrl: './fetch-all-builds.component.html',
  styleUrls: ['./fetch-all-builds.component.css']
})
export class FetchAllBuildsComponent {

  buildsByAccount: any = [];  // List containing the builds
  pageNum: number = 1;  // Pagination control variable
  buildsSubscription : Subscription | undefined;  // Must provide undefined here because strict type checking is on
  areBuildsFetched: boolean = false;

  constructor(
    public webService: WebService,
    public userService: UserService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit() {
    const currentToken = this.userService.getCurrentUserToken();
    const currentID = this.userService.getCurrentUserId();

    if (currentToken && currentID) {
      this.buildsSubscription = this.webService.callFetchAllBuildsEndpoint(currentToken, currentID)
        .subscribe((builds) => {
          // Adds the builds to the list, sloppy code but there doesn't appear to be a way that works
          // that is easily read, something like this.buildsByAccount = builds?.builds?.reverse() ?? []; is another
          // option but it makes the code hard to read
          this.buildsByAccount = builds;
          this.buildsByAccount = this.buildsByAccount.builds;
          this.buildsByAccount = this.buildsByAccount.reverse();

          this.areBuildsFetched = true;

          // Manually trigger change detection to update the UI
          this.cdr.detectChanges();
        });
    }
  }


}
