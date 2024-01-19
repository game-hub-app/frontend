import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserCommunities, User, UserService, Follower } from 'src/app/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
  
  constructor(
    private _userService: UserService
  ) { }

  @Input() memberIdList: UserCommunities[] = [];
  @Output() closeList = new EventEmitter<boolean>();
  memberList:User[] = [];
  loggedUserFollowing:Follower[] = [];
  loggedUserFollowers:Follower[] = [];
  loggedUser:User = JSON.parse(localStorage.getItem("user")??"{}");

  async ngOnInit(): Promise<void> {
    this.memberList = [];
    this.memberIdList.forEach(async (member) => {
      this.memberList.push(await firstValueFrom(this._userService.userIdGet(member.userId)));
    });
    this.loggedUserFollowing = await firstValueFrom(this._userService.userIdFollowingGet(this.loggedUser.id));
    this.loggedUserFollowers = await firstValueFrom(this._userService.userIdFollowersGet(this.loggedUser.id));
  }

  close(){
    this.closeList.emit(false);
  }

  checkIfFollowing(userId:string):boolean{
    return this.loggedUserFollowers.some(follow => follow.followerUserId == userId);
  }

  checkUserFollows(userId:string):boolean{
    return this.loggedUserFollowing.some(follow => follow.followingUserId == userId);
  }

}
