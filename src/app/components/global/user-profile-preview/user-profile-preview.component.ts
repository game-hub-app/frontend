import { Component, OnInit, Input } from '@angular/core';
import { User, UserService, Follower} from 'src/app/api';
import { firstValueFrom } from 'rxjs';
import { FollowService } from 'src/app/services/follow.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile-preview',
  templateUrl: './user-profile-preview.component.html',
  styleUrls: ['./user-profile-preview.component.css']
})
export class UserProfilePreviewComponent implements OnInit{

  @Input() followsLoggedUser = true;
  @Input() userFollows = false;
  @Input() userId:string = "";
  @Input() loggedUserFollowing:Follower[] = [];

  shownUser:User = {} as User;
  followButtonText:String = "Follow";
  followButtonIcon:String = "person_add";
  isLoggedUser:boolean = false;
  pfpRouter = "";

  async toggleFollow(){
    const loggedUser = JSON.parse(localStorage.getItem("user")??"{}");
    if(this.userFollows){
      this.loggedUserFollowing = await this.followService.unfollowUser(this.loggedUserFollowing, this.shownUser.id);
      this.followButtonText = "Follow";      
      this.followButtonIcon = "person_add";
      this.snackBar.open("You unfollowed " + this.shownUser.displayName + "!", "Close", {
        duration: 3000,
      });
    }
    else{
      const follow = await this.followService.followUser(loggedUser.id, this.shownUser.id);
      this.loggedUserFollowing.push(follow);
      this.followButtonText = "Following";
      this.followButtonIcon = "done";
      this.snackBar.open("Now following " + this.shownUser.displayName + "!", "Close", {
        duration: 3000,
      });
    }
    this.userFollows = !this.userFollows;
  }

  constructor(private userService:UserService, private followService:FollowService, private snackBar:MatSnackBar) { }

  async ngOnInit() {
    try{
      this.shownUser = await firstValueFrom(this.userService.userIdGet(this.userId));
      if(this.userId == JSON.parse(localStorage.getItem("user")??"{}").id){
        this.isLoggedUser = true;
      }
      if(this.userFollows){
        this.followButtonText = "Following";
        this.followButtonIcon = "done";
      }
    }catch(err)
    {
    }
    this.pfpRouter = "/users/" + this.shownUser.username;
  }
}
