import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { UserCommunities, Post, PostService, UserCommunitiesService, CommunityService, Community, User, UserService } from 'src/app/api';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  loadingPosts:boolean = true;
  posts:Post[] = [];
  media:Post[] = [];
  noPosts:boolean = false;
  communityOwner:User = {} as User;

  viewList:boolean = false;
  isMobile: boolean = window.innerWidth <= 580;

  editCommunity: boolean = false;
  page: HTMLElement = document.getElementById('page')!;

  

  constructor(
    private route: ActivatedRoute,
    private communityService: CommunityService,
    private router: Router,
    private userCommunitiesService: UserCommunitiesService,
    private _snackBar: MatSnackBar,
    private postService: PostService,
    private userService: UserService
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

        this.posts = await firstValueFrom(
          this.communityService.communityIdPostsGet(this.community.id)
        );
        this.posts.sort((a, b) => (a.creationDate < b.creationDate ? 1 : -1));

        if (this.posts.length == 0){
          this.loadingPosts = false;
           this.noPosts = true;
        }
        console.log(this.posts);
        this.posts = this.posts.filter(post => post.postId == undefined || post.postId == null);
        this.media = this.posts.filter(post => post.mediaUrl != undefined);

        this.loadingPosts = false;
        } catch (err) {
          this.router.navigate(['/']);
        }

      this.page = document.getElementById('page')!;
      
      this.communityOwner = await firstValueFrom(
        this.userService.userIdGet(this.community.communityOwnerId)
      );

      if(this.loggedUserIsMember){
        this.joinButtonIcon = "remove";
        this.joinButtonText = "Leave";
      }
      this.isCommunityOwner = this.loggedUser.id == this.communityOwner.id;
    });
  }

  toggleJoin(){
    if(this.loggedUserIsMember){
      this.leaveCommunity();
    } else {
      this.joinCommunity();
    }
  }

  async joinCommunity(){
    let userCommunities:UserCommunities = {} as UserCommunities;
    userCommunities.userId = this.loggedUser.id;
    userCommunities.communityId = this.community.id;
    var token = localStorage.getItem('token');
    this.userCommunitiesService.defaultHeaders = this.userCommunitiesService.defaultHeaders.set(
      'Authorization',
      'Bearer ' + token
    );
    await firstValueFrom(this.userCommunitiesService.userCommunitiesPost(userCommunities));
    this.joinButtonIcon = "remove";
    this.joinButtonText = "Leave";
    this.loggedUserIsMember = true;
    this.memberCount++;
    this._snackBar.open('Joined community successfully!', 'Close', {
      duration: 5000,
    });
  }

  async leaveCommunity(){
    const ucId = this.memberList.find(uc => uc.userId == this.loggedUser.id)?.id;
    var token = localStorage.getItem('token');
    
    this.userCommunitiesService.defaultHeaders = this.userCommunitiesService.defaultHeaders.set(
      'Authorization',
      'Bearer ' + token
    );
    await firstValueFrom(this.userCommunitiesService.userCommunitiesIdDelete(ucId!));

    this.joinButtonIcon = "add";
    this.joinButtonText = "Join";
    this.loggedUserIsMember = false;
    this.memberCount--;
    this._snackBar.open('Left community successfully!', 'Close', {
      duration: 5000,
    });
  }

  openMemberList(){
    this.viewList = true;
    this.page.classList.add('static-page');
  }
}
