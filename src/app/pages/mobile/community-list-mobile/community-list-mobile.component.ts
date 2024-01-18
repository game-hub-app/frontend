import { Component } from '@angular/core';
import { User, Community, CommunityService, UserService } from 'src/app/api';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-community-list-mobile',
  templateUrl: './community-list-mobile.component.html',
  styleUrls: ['./community-list-mobile.component.css']
})
export class CommunityListMobileComponent {

  isLoading:boolean = true;

  loggedUser:User = JSON.parse(localStorage.getItem('user') || '{}');
  communityList:Community[] = [];

  constructor(
    private _userService:UserService,
    private _communityService:CommunityService
    ) { }

  async ngOnInit() {
    await this.getCommunityList();
    this.isLoading = false;
  }

  async getCommunityList() {
    let userCommunities = await firstValueFrom(this._userService.userIdCommunitiesGet(this.loggedUser.id));
    for (let community of userCommunities) {
      let communityData = await firstValueFrom(this._communityService.communityIdGet(community.communityId));
      this.communityList.push(communityData);
    }
  }

}
