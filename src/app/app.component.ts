import { Component, Host, Input, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  routeData: Data | undefined;

  constructor(private activatedRoute: ActivatedRoute) {
    this.routeData = this.activatedRoute.snapshot.data;
  }

  ngOnInit() {
    if(window.innerWidth < 650) {
      this.isMobile = true;
    }
  }

  isMobile = false;
  title = 'game-hub';
  distanceScrolled = 0;
  @HostListener('window:scroll', ['$event'])
  onScroll(event?:any){
    const postButton = document.getElementById('post');
    if (postButton) {
      if (window.scrollY > this.distanceScrolled || window.scrollY >= window.innerHeight) {
        this.distanceScrolled = window.scrollY;
        postButton.style.opacity = '0.5';
      } else {
        this.distanceScrolled = window.scrollY + 2;
        postButton.style.opacity = '1';
      }

      if (this.distanceScrolled >= window.innerHeight){
        this.distanceScrolled = window.innerHeight;
      }else if(this.distanceScrolled <= 0){
        this.distanceScrolled = 0;
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    if (window.innerWidth < 650) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
}
