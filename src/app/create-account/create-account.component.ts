import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WebService} from "../web.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  createAccountForm: any;

  constructor(private formBuilder: FormBuilder, private webService: WebService, private router: Router) { }

  ngOnInit(): void {
    this.createAccountForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onCreateAccountSubmit(): void {
    // Check if the form is valid
    if (this.createAccountForm.valid) {
      // Form is valid, perform signup action here
      console.log('Form submitted successfully!');

      // Access form values and assign to variables to pass as parameters
      const firstname = this.createAccountForm.get('firstname').value;
      const lastname = this.createAccountForm.get('lastname').value;
      const username = this.createAccountForm.get('username').value;
      const password = this.createAccountForm.get('password').value;

      // You can now send the form data to your backend API for signup process
      this.webService.callCreateAccountEndpoint(firstname, lastname, username, password).subscribe(
        (response: any) => {
          console.log('Full response:', response);
          window.alert('Account creation successful');

          // Return to root page here
          this.router.navigate(['/']);

        },
        (error: any) => {
          console.error('Error creating account', error);
          window.alert('Account creation failed');
        });
    }
    else {
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
