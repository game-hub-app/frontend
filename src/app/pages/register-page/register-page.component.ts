import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/api';
import { RegisterPageService } from 'src/app/services/register-page.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private registerPageService: RegisterPageService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = this.registerPageService.buildForm();
  }

  async registerUser() {
    this.registerForm.disable();

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      alert('Passwords do not match');
      this.registerForm.enable();
      return;
    }

    try {
      const register = await firstValueFrom(
        this._authService.authRegisterPost({
          displayName: this.registerForm.value.displayName,
          username: this.registerForm.value.username,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
        })
      );

      console.log(register)

      alert('Registration success. Logging in...');

      const login = await firstValueFrom(
        this._authService.authLoginPost({
          usernameOrEmail: this.registerForm.value.username,
          password: this.registerForm.value.password,
        })
      );

      alert('Login success');

      localStorage.setItem('token', login);
    } catch (error: any) {
      this.registerForm.enable();
      alert(error.error);
    }
  }

  getErrorMessage(label: string) {
    const formControl = this.registerForm.get(label);

    if (formControl?.hasError('required')) {
      return 'You must enter a value';
    }

    return formControl?.hasError('email') ? 'Not a valid email' : '';
  }
}
