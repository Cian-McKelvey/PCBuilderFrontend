import { Component } from '@angular/core';
import {UserService} from "../user.service";
import {WebService} from "../web.service";
import {FormBuilder, Validators} from "@angular/forms";
import {StorageService} from "../storage.service";
import {PartsService} from "../parts.service";

@Component({
  selector: 'app-create-new-build',
  templateUrl: './create-new-build.component.html',
  styleUrls: ['./create-new-build.component.css']
})
export class CreateNewBuildComponent {

  priceForm: any;
  isBuildCreated: boolean = false;
  buildInfo: any = null;

  cpuArray: any[] = [];
  gpuArray: any[] = [];
  ramArray: any[] = [];
  storageArray: any[] = [];
  motherboardArray: any[] = [];
  psuArray: any[] = [];
  caseArray: any[] = [];


  ngOnInit() {
    this.priceForm = this.formBuilder.group({
      // Verifies the price is inputted and is a valid whole number
      price: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]]
    });

    // Divides the parts into their separate part arrays using the partsService
    const partsArray = this.storageService.getFromLocalStorage('PartsArray');
    this.partsService.setAllSeparatePartLists(partsArray);

    // These arrays contain the parts of each type, allows for the editing of parts
    this.cpuArray = this.partsService.getCpuList();
    this.gpuArray= this.partsService.getGpuList();
    this.ramArray = this.partsService.getRamList();

    // This one isn't loading correctly
    this.storageArray = this.partsService.getStorageList();
    for (let i = 0; i < this.storageArray.length; i++) {
      console.log(this.storageArray[i]);
    }

    this.psuArray = this.partsService.getPsuList();
    this.motherboardArray = this.partsService.getMotherboardList();
    this.caseArray= this.partsService.getCaseList();
  }

  constructor(public userService: UserService, public webService: WebService,
              private formBuilder: FormBuilder, public storageService: StorageService,
              private partsService: PartsService) {}

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
