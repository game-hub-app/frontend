import { Component, Host, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isMobile = false;
  ngOnInit() {
    if(window.innerWidth < 980) {
      this.isMobile = true;
    }
  }

  title = 'game-hub';
  @HostListener('window:scroll', ['$event'])
  onScroll(event?:any){
    const postButton = document.getElementById('post');
    if (postButton) {
      if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight) {
        postButton.style.opacity = '0.5';
      } else {
        postButton.style.opacity = '1';
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    if (window.innerWidth < 980) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
}
