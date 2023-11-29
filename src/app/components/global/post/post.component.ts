import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Post, User, PostService, UserService } from 'src/app/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnChanges {
  @Input() post: Post | undefined;
  postAuthor: User | undefined;
  postLikes: number = 0;
  postComments: Post[] = [];
  loggedInUser: User | undefined;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  async ngOnChanges() {
    if (!this.post) return;

    const login = localStorage.getItem('token') || '';

    this._postService.defaultHeaders = this._postService.defaultHeaders.set(
      'Authorization',
      'Bearer ' + login
    );

    this._userService.defaultHeaders = this._userService.defaultHeaders.set(
      'Authorization',
      'Bearer ' + login
    );

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

    var url = window.location.href;

    if (url.includes('/feed' || '/users')) {
      url = url.replace('/feed', `/post/${this.post.id}`);
      url = url.replace('/users', `/post/${this.post.id}`);
    }

    await navigator.clipboard.writeText(url);

    this.snackBar.open('Link copied to clipboard!', 'Close', {
      duration: 2000,
    });
  }

  async goToPost() {
    if (!this.post) return;

    this.router.navigate(['post', this.post.id]);
  }
}
