import { Component, OnInit, HostListener } from '@angular/core';
import { Community, CommunityService, User, UserCommunitiesService, UserService } from 'src/app/api';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

  isMobile = false;

  constructor(
    private _communityService: CommunityService,
    private _userCommunityService: UserCommunitiesService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    if(window.innerWidth < 650) {
      this.isMobile = true;
    }

    let user:User = JSON.parse(localStorage.getItem("user")!);

    let token = localStorage.getItem("token");
    this._userService.defaultHeaders = this._userService.defaultHeaders.set('Authorization', 'Bearer ' + token);

    this._userService.userIdCommunitiesGet(user.id).subscribe((userCommunities) => {
      var userCommunityList = userCommunities;

      if(userCommunityList.length > 0) {
        userCommunityList.forEach((userCommunity) => {
          this._communityService.communityIdGet(userCommunity.communityId).subscribe  ((community) => {
            this.userCommunities.push(community);
          });
        });
      }
    });


  }

  userCommunities = [] as Community[];
  @HostListener('window:resize', ['$event'])
  onResize(event?: any): void {
    if (window.innerWidth < 650) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

}
