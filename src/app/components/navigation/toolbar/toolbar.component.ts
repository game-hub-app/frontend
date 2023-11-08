import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{

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
