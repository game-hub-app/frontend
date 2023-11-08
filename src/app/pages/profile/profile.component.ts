import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isMobile:Boolean = false;

  followButtonText:String = "Follow";
  followButtonIcon:String = "person_add"


  constructor(
    private _location: Location
  ) { }

  ngOnInit(): void {
    if (window.innerWidth < 580) {
      this.isMobile = true;
    }
  }

  toggleFollow(){
    if(this.followButtonText=="Follow"){
      document.getElementById("followButton")!.classList.add("Following");
      this.followButtonIcon = "done"
      this.followButtonText = "Following"
    }else{
      document.getElementById("followButton")!.classList.remove("Following");
      this.followButtonIcon = "person_add"
      this.followButtonText = "Follow"
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    if (window.innerWidth < 580) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  goBack() {
    this._location.back();
  }

}
