import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HostListener } from '@angular/core';
import { User } from 'src/app/api/model/user';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/api';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isMobile:Boolean = false;
  shownUser:User = null!;
  followButtonText:String = "Follow";
  followButtonIcon:String = "person_add"

  username: string = this.route.snapshot.paramMap.get('username')!;

  constructor(
    private _location: Location,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    try{
      this.shownUser = await firstValueFrom(this.userService.userProfileUsernameGet(this.username));
    }
    catch(err){
      this.router.navigate(['/']);
    }

    console.log(this.shownUser);
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
