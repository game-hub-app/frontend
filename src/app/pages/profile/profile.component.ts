import { Component, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HostListener } from '@angular/core';
import { User } from 'src/app/api/model/user';
import { firstValueFrom } from 'rxjs';
import { Post, UserService } from 'src/app/api';
import { ActivatedRoute, ExtraOptions } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Follower, FollowerService } from 'src/app/api';
import { FollowService } from 'src/app/services/follow.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  username: string = this.route.snapshot.paramMap.get('username')!;

  isMobile: Boolean = false;

  shownUser: User = {} as User;
  loggedUser: User = JSON.parse(localStorage.getItem('user') ?? '{}');
  isLoggedUser: boolean = false;

  followButtonText: String = 'Follow';
  followButtonIcon: String = 'person_add';
  loggedUserFollows: boolean = false;
  followerList: Follower[] = [];
  followingList: Follower[] = [];
  followerCount: number = 0;
  followingCount: number = 0;
  followIndex: number = 0;

  followList: boolean = false;
  editProfile: boolean = false;

  posts: Post[] = [];
  comments: Post[] = [];
  media: Post[] = [];

  page: HTMLElement = document.getElementById('page')!;

  @ViewChild('bio') bioContent: ElementRef | undefined;

  constructor(
    private _location: Location,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private followService: FollowService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      this.username = params.get('username')!;
      this.isLoggedUser = false;
      this.followList = false;
      this.editProfile = false;
      try {
        this.shownUser = await firstValueFrom(
          this.userService.userProfileUsernameGet(this.username)
        );
      } catch (err) {
        this.router.navigate(['/']);
      }
      try {
        this.followerList = await firstValueFrom(
          this.userService.userIdFollowersGet(this.shownUser.id)
        );
        this.followingList = await firstValueFrom(
          this.userService.userIdFollowingGet(this.shownUser.id)
        );
      } catch (err) {}
      this.followerCount = this.followerList.length;
      this.followingCount = this.followingList.length;
      this.page = document.getElementById('page')!;
      if (this.username == this.loggedUser.username) {
        this.isLoggedUser = true;
      } else {
        this.loggedUserFollows = this.followerList.some(
          (follower) => follower.followerUserId == this.loggedUser.id
        );
        if (this.loggedUserFollows) {
          document.getElementById('followButton')!.classList.add('Following');
          this.followButtonIcon = 'done';
          this.followButtonText = 'Following';
        } else {
          this.followButtonIcon = 'person_add';
          this.followButtonText = 'Follow';
        }
      }

      let posts = await firstValueFrom(
        this.userService.userIdPostsGet(this.shownUser.id)
      );

      posts.sort((a, b) => (a.creationDate < b.creationDate ? 1 : -1));

      this.posts = posts.filter((post) => post.postId == null);
      this.comments = posts.filter(
        (post) => post.postId != null || post.postId != undefined
      );
      this.media = posts.filter((post) => post.mediaUrl != '');

      var usernames = this.shownUser.bio?.match(/@[A-Za-z0-9-_]*/g) || [];
      if (usernames.length > 0) {
        var users = await firstValueFrom(this.userService.userGet());

        usernames.forEach(async (username) => {
          try {
            var user = users.find(
              (u) => u.username == username.replace('@', '')
            );

            if (!user) return;

            this.bioContent!.nativeElement.innerHTML =
              this.bioContent!.nativeElement.innerHTML.replace(
                username,
                `<a style="color:#ffd740;text-decoration:none;" href="/users/${user.username}">${user.displayName}</a> `
              );
          } catch (error: any) {}
        });
      }
    });

    if (this.loggedUser.id == null) {
      document
        .getElementById('followerClick')!
        .classList.remove('follow-click');
      document
        .getElementById('followingClick')!
        .classList.remove('follow-click');
    }

    if (window.innerWidth < 580) {
      this.isMobile = true;
    }
  }

  openFollowList(index: number) {
    if (this.loggedUser.id == null) {
      return;
    }
    this.followIndex = index;
    this.followList = true;
  }

  async toggleFollow() {
    if (this.loggedUser.id == null) {
      this.snackBar.open('You need to be logged in to follow users!', 'Close', {
        duration: 5000,
      });
      return;
    }
    if (!this.loggedUserFollows) {
      try {
        const follow = await this.followService.followUser(
          this.loggedUser.id,
          this.shownUser.id
        );
        this.loggedUserFollows = true;
        this.followerList.push(follow);
        document.getElementById('followButton')!.classList.add('Following');
        this.followButtonIcon = 'done';
        this.followButtonText = 'Following';
        this.followerCount++;
        this.snackBar.open(
          'Now following ' + this.shownUser.displayName + '!',
          'Close',
          {
            duration: 3000,
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        this.followerList = await this.followService.unfollowUser(
          this.followerList,
          this.shownUser.id
        );
        this.loggedUserFollows = false;
        document.getElementById('followButton')!.classList.remove('Following');
        this.followButtonIcon = 'person_add';
        this.followButtonText = 'Follow';
        this.followerCount--;
        this.snackBar.open(
          'You unfollowed ' + this.shownUser.displayName + '!',
          'Close',
          {
            duration: 3000,
          }
        );
      } catch (err) {
        console.log(err);
      }
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
