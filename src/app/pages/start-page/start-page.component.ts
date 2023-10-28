import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  isMobile:boolean = false;
  constructor() { }

  ngOnInit() {
    this.onResize();
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
