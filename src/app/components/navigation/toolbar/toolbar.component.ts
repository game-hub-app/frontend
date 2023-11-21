import { Component, OnInit, HostListener } from '@angular/core';
import { User } from 'src/app/api/model/user';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
  isMobile = false;
  username = "";
  profilePictureURL = "";
  routerLink = "";

  ngOnInit() {
    if(window.innerWidth < 650) {
      this.isMobile = true;
    }
    if(!localStorage.getItem("user")){
      this.routerLink = "/";
    }else{
      let user:User = JSON.parse(localStorage.getItem("user")!);
      this.username = user.username;
      this.profilePictureURL = user.profilePictureURL || "https://cdn.game-hub.pt/placeholder-pfp.jpg";
      this.routerLink = "/users/" + user.username;
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
