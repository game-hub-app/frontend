import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Post, PostService, User, UserService } from 'src/app/api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  postAuthor: User | undefined;
  postLikes: number = 0;
  postComments: Post[] = [];
  loggedInUser: User | undefined;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _location: Location,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  async ngOnInit() {
    const login = localStorage.getItem('token') || '';

    this._postService.defaultHeaders = this._postService.defaultHeaders.set(
      'Authorization',
      'Bearer ' + login
    );

    this._userService.defaultHeaders = this._userService.defaultHeaders.set(
      'Authorization',
      'Bearer ' + login
    );

    this.route.paramMap.subscribe(async (params) => {
      this.post = await firstValueFrom(
        this._postService.postIdGet(params.get('id')!)
      );

      if (this.post) {
        this.postAuthor = await firstValueFrom(
          this._userService.userIdGet(this.post.userId)
        );

        var postLikes = await firstValueFrom(
          this._postService.postIdLikesGet(this.post.id)
        );

        this.postLikes = postLikes.length || 0;

        this.postComments = await firstValueFrom(
          this._postService.postIdCommentsGet(this.post.id)
        );

        this.loggedInUser = await firstValueFrom(
          this._userService.userProfileGet()
        );
      }
    });
  }

  goBack() {
    this._location.back();
  }

  goToAuthorProfile() {
    if (!this.postAuthor) return;

    this.router.navigate(['users', this.postAuthor.username]);
  }

  async likePost() {
    if (!this.post) return;

    await firstValueFrom(this._postService.postIdLikePost(this.post.id));

    if (this.post.isLiked) {
      this.post.isLiked = false;
      this.postLikes--;
    } else {
      this.post.isLiked = true;
      this.postLikes++;
    }
  }

  async sharePost() {
    // Copy to clipboard
    if (!this.post) return;

    const url = window.location.href;

    await navigator.clipboard.writeText(url);

    this.snackBar.open('Link copied to clipboard!', 'Close', {
      duration: 2000,
    });
  }
}
