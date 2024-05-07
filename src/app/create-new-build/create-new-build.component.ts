import {Component} from '@angular/core';
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

  // Arrays that hold each of the individual part grouped by type
  cpuArray: any[] = [];
  gpuArray: any[] = [];
  ramArray: any[] = [];
  storageArray: any[] = [];
  motherboardArray: any[] = [];
  psuArray: any[] = [];
  caseArray: any[] = [];

  // Variable that hold parts so that fetched builds can be edited
  selectedParts: { [key: string]: { partName: string, partPrice: number } } = {};
  editedPartsCount: number = 0;  // Allows checking if builds have been edited at all

  ngOnInit() {
    this.priceForm = this.formBuilder.group({
      price: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/), // Requires numeric data
        Validators.min(500), // Minimum value of 500
        Validators.max(2000) // Maximum value of 2000
      ]]
    });

    // Divides the parts into their separate part arrays using the partsService
    const partsArray = this.storageService.getFromLocalStorage('PartsArray');
    this.partsService.setAllSeparatePartLists(partsArray);

    // These arrays contain the parts of each type, allows for the editing of parts
    this.cpuArray = this.partsService.getCpuList();
    this.gpuArray= this.partsService.getGpuList();
    this.ramArray = this.partsService.getRamList();
    this.storageArray = this.partsService.getStorageList();
    this.psuArray = this.partsService.getPsuList();
    this.motherboardArray = this.partsService.getMotherboardList();
    this.caseArray= this.partsService.getCaseList();

    // Sets the editedParts count to 0
    this.editedPartsCount = 0;
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
    // Performs validation that the price is in a valid range
    const buildPrice = this.priceForm.value.price;
    if (buildPrice > 2000) {
      window.alert("Build price to high, max value 2000");
    }
    if (buildPrice < 500) {
      window.alert("Minimum Price is £500")
    }
    if (buildPrice < 0) {
      window.alert("Build price must be a positive number");
    }
    if (typeof buildPrice !== 'number') {
      window.alert("Price must be entered as a whole number")
    }

    const token = this.userService.getCurrentUserToken();
    const userID = this.userService.getCurrentUserId();

    if (this.priceForm.valid && token && userID) {
      // Sends a request for a new pc build based on the input price
      this.webService.callCreateNewBuildEndpoint(buildPrice.toString(), token, userID)
        .subscribe(
          (response) => {
            console.log('Build creation successful', response);

            // Assign the response data to the buildInfo property
            this.buildInfo = response;
            this.buildInfo = this.buildInfo.Build;
            console.log(this.buildInfo);

            this.editedPartsCount = 0;  // Resets the edited parts counter for the new build

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

  // ! Old approach, not in use currently
  submitBuildUpdate(partType: string, partName: string, partPrice: number, buildID: string) {
    const token = this.userService.getCurrentUserToken();
    if (token) {
      this.webService.callEditBuildEndpoint(partType, partName, partPrice, token, buildID).subscribe(
        (response) => {

          // This only updates data in the db, doesn't show any new info on the page

          console.log('Build edit successful', response);
          window.alert("Build has been updated");
        },
        (error) => {
          console.error('Error editing build', error);
          // Handle error
          window.alert('Failed to edit build. Please try again.');
        }
      );
    }
    else {
      console.error('Token expired');
      window.alert("Token Expired");
    }
  }

  // Recalculates the total price
  calculateTotalPrice(items: any): number {
    let totalPrice = 0;

    // Iterate over each item in the object and accumulate the prices
    Object.keys(items).forEach(key => {
      // Check if the current property is not one of the meta-properties like "OverallPrice", "build_id", etc.
      if (typeof items[key] === 'object' && key !== 'OverallPrice' && !key.endsWith('_id')) {
        totalPrice += items[key].price;
      }
    });

    return totalPrice;
  }

  // Changes the part in the build and html
  updatePart(partName: string): void {
    const selectedPart = this.selectedParts[partName];
    if (selectedPart) {
      this.buildInfo[partName] = {
        price: selectedPart.partPrice,
        value: selectedPart.partName,
      };
      this.buildInfo['OverallPrice'] = this.calculateTotalPrice(this.buildInfo);
      this.editedPartsCount++;
    }
  }

  // Replaces the backend build with the new edited build
  submitBuildReplacement(): void {
    const token = this.userService.getCurrentUserToken();
    if (token) {
      this.webService.callUpdateBuildEndpoint(this.buildInfo, this.buildInfo.build_id, token).subscribe(
        (response) => {

          // This only updates data in the db, doesn't show any new info on the pag

          console.log('Build has been replace with the new build to reflect aimed changes:', response);
          window.alert("Build has been updated");
        },
        (error) => {
          console.error('Error editing build', error);
          window.alert('Failed to edit build. Please try again.');
        }
      );
    }
    else {
      console.error('Token expired/not valid');
      window.alert("Token expired/not valid");
    }
  }

}
