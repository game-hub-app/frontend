import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenVerificationService {

  constructor(
    private userService: UserService
    ) { }

  async verifyToken(): Promise<boolean> {
    try {
      if (localStorage.getItem("token") !== null) { 
        this.userService.defaultHeaders = this.userService.defaultHeaders
        .set('Authorization', 'Bearer ' + localStorage.getItem("token"));
      };

      const user = await firstValueFrom(this.userService.userProfileGet());
      localStorage.setItem("user", JSON.stringify(user));
      return true;
      // user is logged in when true
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
      // user has no valid session or is not logged in
    }
  }
}
