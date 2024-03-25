import { Component } from '@angular/core';
import {UserService} from "../user.service";
import {WebService} from "../web.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-new-build',
  templateUrl: './create-new-build.component.html',
  styleUrls: ['./create-new-build.component.css']
})
export class CreateNewBuildComponent {

  priceForm: any;

  ngOnInit() {
    this.priceForm = this.formBuilder.group({
      // HERE
    });
  }

  constructor(public userService: UserService, public webService: WebService, private formBuilder: FormBuilder) {}

  submitPrice() {
    // if (this.price != 0) {
    //
    // }
  }

}
