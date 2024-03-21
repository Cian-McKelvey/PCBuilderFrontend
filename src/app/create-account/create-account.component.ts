import { Component } from '@angular/core';
import {StorageService} from "../storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  createAccountForm: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createAccountForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onCreateAccountSubmit(): void {
    // Check if the form is valid
    if (this.createAccountForm.valid) {
      // Form is valid, perform signup action here
      console.log('Form submitted successfully!');
      console.log('Form data:', this.createAccountForm.value);

      // You can now send the form data to your backend API for signup process

    } else {
      // Form is invalid, mark all fields as touched to display validation errors
      this.createAccountForm.markAllAsTouched();
    }
  }

  // Utility method to check if a form control is invalid and has been touched
  isInvalidSignup(controlName: string): boolean {
    const control = this.createAccountForm.get(controlName);
    return control.invalid && (control.dirty || control.touched);
  }
}
