import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/api';
import { LoginPageService } from 'src/app/services/login-page.service';
import { UserService } from 'src/app/api';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;

  hidePassword: boolean = true;

  constructor(
    private loginPageService: LoginPageService,
    private _authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loginForm = this.loginPageService.buildForm();
  }

  async loginUser() {
    try {
      this.loginForm.disable();
      const login = await firstValueFrom(
        this._authService.authLoginPost({
          usernameOrEmail: this.loginForm.value.usernameOrEmail,
          password: this.loginForm.value.password,
        })
      );

      // alert('Login success');

      this.userService.defaultHeaders = this.userService.defaultHeaders.set(
        'Authorization',
        'Bearer ' + login
      );

      const user = await firstValueFrom(this.userService.userProfileGet());
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', login);
      this.router.navigate(['/', 'feed']);
    } catch (error: any) {
      this.loginForm.enable();
      alert(error.error);
    }
  }

  getErrorMessage(label: string) {
    const formControl = this.loginForm.get(label);

    if (formControl?.hasError('required')) {
      return 'You must enter a value';
    }

    return formControl?.hasError('email') ? 'Not a valid email' : '';
  }
}
