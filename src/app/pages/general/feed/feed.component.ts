import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

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

