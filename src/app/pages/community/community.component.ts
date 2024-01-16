import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { User } from 'src/app/api';
import { Community } from 'src/app/api';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from 'src/app/api';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

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
  memberList:User[] = [];

  constructor(
    private route: ActivatedRoute,
    private communityService: CommunityService,
    private router: Router
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
      } catch (err) {
        this.router.navigate(['/']);
      }

      this.isCommunityOwner = this.loggedUser.id == this.community.communityOwnerId;
    });
  }

  editCommunity(){
    alert("Not done womp womp cry bout it");
  }

  toggleJoin(){
    alert("Not done womp womp cry bout it");
  }

  openMemberList(){
    alert("Not done womp womp cry bout it");
  }
}
