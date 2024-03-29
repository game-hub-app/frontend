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

  isLoading: boolean = true;
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
      try{

        this.post = await firstValueFrom(
          this._postService.postIdGet(params.get('id')!)
          );
      }catch(err){
        this._location.back();
      }
      this.postComments = await firstValueFrom(
        this._postService.postIdCommentsGet(params.get('id')!)
      );
      this.postComments.sort((a, b) =>
        a.creationDate < b.creationDate ? 1 : -1
      );
    });
    this.isLoading = false;
  }

  refreshComments() {
    this._postService.postIdCommentsGet(this.post!.id).subscribe((data) => {
      this.postComments = data;
    });
    this.postComments.sort((a, b) =>
      a.creationDate < b.creationDate ? 1 : -1
    );
  }

  goBack() {
    this._location.back();
  }
}
