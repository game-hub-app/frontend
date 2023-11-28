import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { User, Follower, UserService } from 'src/app/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.css']
})
export class FollowListComponent implements OnInit{
  @Output() closeList = new EventEmitter<boolean>();
  @Input() followingList: Follower[] = [];
  @Input() followersList: Follower[] = [];
  @Input() tabIndex:number = 0;
  @Input() displayName:String = "";
  loggedUserFollowing:Follower[] = [];
  loggedUserFollowers:Follower[] = [];
  loggedUser:User = JSON.parse(localStorage.getItem("user")??"{}");
  constructor(private userService:UserService) {
   }

  close(){
    this.closeList.emit(false);
  }

  async ngOnInit():Promise<void> {
    this.loggedUserFollowing = await firstValueFrom(this.userService.userIdFollowingGet(this.loggedUser.id));
    this.loggedUserFollowers = await firstValueFrom(this.userService.userIdFollowersGet(this.loggedUser.id));
  }

  checkIfFollowing(userId:string):boolean{
    return this.loggedUserFollowers.some(follow => follow.followerUserId == userId);
  }

  checkUserFollows(userId:string):boolean{
    return this.loggedUserFollowing.some(follow => follow.followingUserId == userId);
  }
}
