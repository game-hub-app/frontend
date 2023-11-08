import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  appName = 'GameHub';
  appDescription = 'The #1 place to communicate with friends, and meet new gamers.';
  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) {}
  async ngOnInit(): Promise<void> { 
    try {
      if (localStorage.getItem("token") !== null) { 
        this.userService.defaultHeaders = this.userService.defaultHeaders
        .set('Authorization', 'Bearer ' + localStorage.getItem("token"));
      };
      
      const user = await firstValueFrom(this.userService.userProfileGet());

      this.router.navigate(['/', 'feed']);
      // user is logged in when true
    } catch (err) {
      // user has no valid session or is not logged in
    }
  }
}
