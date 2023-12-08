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
    private route: ActivatedRoute
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
      this.postComments = await firstValueFrom(this._postService.postIdCommentsGet(params.get('id')!)
      );
    });
  }

  refreshComments(){
    this._postService.postIdCommentsGet(this.post!.id).subscribe((data) => {
      this.postComments = data;
    });
  }

  goBack() {
    this._location.back();
  }
}
