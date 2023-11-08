import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

  isMobile = false;

  ngOnInit() {
    if(window.innerWidth < 650) {
      this.isMobile = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any): void {
    if (window.innerWidth < 650) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

}
