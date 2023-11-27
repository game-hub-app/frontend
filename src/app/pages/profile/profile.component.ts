import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HostListener } from '@angular/core';
import { User } from 'src/app/api/model/user';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/api';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  loggedUser:User = JSON.parse(localStorage.getItem("user")??"{}");
  username: string = this.route.snapshot.paramMap.get('username')!;
  editProfile: boolean = false;
  isLoggedUser:boolean = false;

  page: HTMLElement = document.getElementById('page')!;

  constructor(
    private _location: Location,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  
  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      this.username = params.get('username')!;
      try{
        this.shownUser = await firstValueFrom(this.userService.userProfileUsernameGet(this.username));
      }
      catch(err){
        this.router.navigate(['/']);
      }

      this.page = document.getElementById('page')!;
      if(this.shownUser.id == this.loggedUser.id){
        this.isLoggedUser = true;
      }
    });

    if (window.innerWidth < 580) {
      this.isMobile = true;
    }
  }


  toggleFollow(){
    if(this.loggedUser.id == null){
      this.snackBar.open("You need to be logged in to follow users!", "Close", {
        duration: 5000,
      });
      return;
    }

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
