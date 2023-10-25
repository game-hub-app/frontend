import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegisterPageService } from 'src/app/services/register-page.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private registerPageService: RegisterPageService) {}

  ngOnInit() {
    this.registerForm = this.registerPageService.buildForm();
  }

  registerUser() {
    throw new Error('Method not implemented.');
  }

  getErrorMessage(label: string) {
    const formControl = this.registerForm.get(label);

    if (formControl?.hasError('required')) {
      return 'You must enter a value';
    }

    return formControl?.hasError('email') ? 'Not a valid email' : '';
  }
}
