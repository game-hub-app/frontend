import { Component, HostListener, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-mobilenav',
  templateUrl: './mobilenav.component.html',
  styleUrls: ['./mobilenav.component.css']
})
export class MobilenavComponent implements OnInit{

  isMobile = false;

  ngOnInit() {
    if(window.innerWidth < 650) {
      this.isMobile = true;
    }
  }

  //send toggle status to sidenav
  @Output() toggle = false;

  @Input() addPost: boolean = false;

  toggleNav() {
    this.toggle = !this.toggle;
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
