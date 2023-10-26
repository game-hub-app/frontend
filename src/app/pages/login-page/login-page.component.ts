import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginPageService } from 'src/app/services/login-page.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private loginPageService: LoginPageService) {}

  ngOnInit() {
    this.loginForm = this.loginPageService.buildForm();
  }

  loginUser() {
    throw new Error('Method not implemented.');
  }

  getErrorMessage(label: string) {
    const formControl = this.loginForm.get(label);

    if (formControl?.hasError('required')) {
      return 'You must enter a value';
    }

    return formControl?.hasError('email') ? 'Not a valid email' : '';
  }
}
