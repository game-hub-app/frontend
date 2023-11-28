import { Component, OnInit, Input } from '@angular/core';
import { User, UserService } from 'src/app/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-profile-preview',
  templateUrl: './user-profile-preview.component.html',
  styleUrls: ['./user-profile-preview.component.css']
})
export class UserProfilePreviewComponent implements OnInit{

  @Input() followsLoggedUser = true;
  @Input() userFollows = false;
  @Input() userId:string = "";

  shownUser:User = null!;
  followButtonText:String = "Follow";
  followButtonIcon:String = "person_add";
  isLoggedUser:boolean = false;

  toggleFollow(){
    if(this.userFollows){
      
      this.followButtonText = "Follow";
      this.followButtonIcon = "person_add"
    }
    else{
      this.followButtonText = "Following";
      this.followButtonIcon = "done";
    }
    this.userFollows = !this.userFollows;
  }

  constructor(private userService:UserService) { }

  async ngOnInit() {
    try{
      this.shownUser = await firstValueFrom(this.userService.userIdGet(this.userId));
      if(this.userId == JSON.parse(localStorage.getItem("user")??"{}").id){
        this.isLoggedUser = true;
      }
    }catch(err)
    {
    }
    if(this.userFollows){
      this.followButtonText = "Following";
      this.followButtonIcon = "done";
    }
  }
}
