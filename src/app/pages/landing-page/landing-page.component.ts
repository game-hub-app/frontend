import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenVerificationService } from 'src/app/services/token-verification.service';

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
    private router: Router,
    private tokenVerify: TokenVerificationService
  ) {}
  ngOnInit(){
    this.tokenVerify.verifyToken().then((res) => {
      if(res){
        this.router.navigate(['/feed']);
      }
    });
  }
}
