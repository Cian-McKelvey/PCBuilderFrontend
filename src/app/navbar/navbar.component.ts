import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router, private route: ActivatedRoute) {}

  // Checks if the current URL matches a given route
  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

}
