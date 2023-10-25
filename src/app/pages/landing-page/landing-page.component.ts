import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  appName = 'GameHub';
  appDescription = 'The #1 place to communicate with friends, and meet new gamers.';

  constructor() { }

  ngOnInit(): void { }
}
