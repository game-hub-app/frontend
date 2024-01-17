import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from 'src/app/api';
import { Community } from 'src/app/api';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from 'src/app/api';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { UserCommunitiesService } from 'src/app/api';
import { UserCommunities } from 'src/app/api';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit{

  communityId: string = this.route.snapshot.paramMap.get('id')!;

  loggedUser: User = JSON.parse(localStorage.getItem('user') ?? '{}');
  community:Community = {} as Community;
  isCommunityOwner:boolean = false;
  joinButtonIcon:string = "add";
  joinButtonText:string = "Join";
  memberCount:number = 0;
  memberList:UserCommunities[] = [];
  loggedUserIsMember:boolean = false;

  editCommunity: boolean = false;
  page: HTMLElement = document.getElementById('page')!;

  constructor(
    private route: ActivatedRoute,
    private communityService: CommunityService,
    private router: Router,
    private userCommunitiesService: UserCommunitiesService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.communityId = params.get('id')!;
      this.isCommunityOwner = false;
      
      this.memberList = [];
      try {
        this.community = await firstValueFrom(
          this.communityService.communityIdGet(this.communityId)
        );
        let userCommunities:UserCommunities[] = await firstValueFrom(
          this.userCommunitiesService.userCommunitiesGet()
        );

        this.memberList = userCommunities.filter(uc => uc.communityId == this.community.id);
        this.memberCount = this.memberList.length;

        this.loggedUserIsMember = this.memberList.some(uc => uc.userId == this.loggedUser.id);
      } catch (err) {
        this.router.navigate(['/']);
      }

      this.page = document.getElementById('page')!;

      if(this.loggedUserIsMember){
        this.joinButtonIcon = "remove";
        this.joinButtonText = "Leave";
      }
      this.isCommunityOwner = this.loggedUser.id == this.community.communityOwnerId;
    });
  }

  toggleJoin(){
    alert("Not done womp womp cry bout it");
  }

  openMemberList(){
    alert("Not done womp womp cry bout it");
  }
}
