import { Component, OnInit, HostListener } from '@angular/core';
import { User } from 'src/app/api/model/user';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
  loggedUser:User = JSON.parse(localStorage.getItem("user")!);
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
