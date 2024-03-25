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
  isBuildCreated: boolean = false;
  buildInfo: any = null;

  ngOnInit() {
    this.priceForm = this.formBuilder.group({
      // Verifies the price is inputted and is a valid whole number
      price: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]]
    });
  }

  constructor(public userService: UserService, public webService: WebService, private formBuilder: FormBuilder) {}

  isInvalid(control: string): boolean {
    return (
      this.priceForm.controls[control].invalid &&
      this.priceForm.controls[control].touched
    );
  }

// Helper function for isIncomplete - Used to check if any parts of the form have been touched
  isUntouched(): boolean {
    return this.priceForm.controls.price.pristine;
  }

// Checks if the form is incomplete in any way, such as incorrect inputs
  isIncomplete(): boolean {
    return this.isInvalid('price') || this.isUntouched();
  }

  submitPrice() {
    const buildPrice = this.priceForm.value.price;
    const token = this.userService.getCurrentUserToken(); // Assuming you have userToken available
    const userID = this.userService.getCurrentUserId(); // Assuming you have userID available

    if (this.priceForm.valid && token && userID) {
      this.webService.callCreateNewBuildEndpoint(buildPrice.toString(), token, userID)
        .subscribe(
          (response) => {
            console.log('Build creation successful', response);

            // Assign the response data to the buildInfo property
            this.buildInfo = response;
            this.buildInfo = this.buildInfo.Build;

            // Print the entire buildInfo object to the console
            console.log('buildInfo:', this.buildInfo);

            window.alert('Build created successfully');
            this.isBuildCreated = true;
            this.priceForm.reset();
          },
          (error) => {
            console.error('Error creating build', error);
            // Handle error
            window.alert('Failed to create build. Please try again.');
          }
        );
    } else {
      console.error('Form is invalid');
    }
  }


}
