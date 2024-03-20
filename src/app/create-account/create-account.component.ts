import { Component } from '@angular/core';
import {StorageService} from "../storage.service";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  constructor(public storageService: StorageService) {}

  ngOnInit() {
    let myVariable = this.storageService.getFromLocalStorage("MyVariable");
    console.log(myVariable)
  }
}
