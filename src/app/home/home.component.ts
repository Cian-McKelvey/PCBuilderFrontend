import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {WebService} from "../web.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private formBuilder: FormBuilder, public webService: WebService, public userService: UserService) {}

  ngOnInit() {

  }

}
