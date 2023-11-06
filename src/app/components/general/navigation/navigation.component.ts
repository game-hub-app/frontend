import { Component, HostListener, OnInit,  } from '@angular/core';
import { MobilenavComponent } from '../../navigation/mobilenav/mobilenav.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isMobile = false;
  ngOnInit() {
    if(window.innerWidth < 980) {
      this.isMobile = true;
    }
  }

  //receive toggle status from mobilenav

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
    if (window.innerWidth < 980) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
}
