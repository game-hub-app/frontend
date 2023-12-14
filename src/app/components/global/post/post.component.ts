import { Component, ElementRef, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, windowWhen } from 'rxjs';
import { Post, User, PostService, UserService } from 'src/app/api';
import { Location } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NewPostMobileService } from 'src/app/services/new-post-mobile.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnChanges {
  @Input() post: Post | undefined;
  @Output() refreshComment = new EventEmitter<boolean>();
  @ViewChild('content')content: ElementRef | undefined;
  postAuthor: User | undefined;
  postLikes: number = 0;
  postCommentsCount: number = 0;
  postComments: Post[] = [];
  loggedInUser: User | undefined;
  showNewComment: boolean = false;
  form: FormGroup;
  parentPost: Post | undefined;
  parentPostAuthor: User | undefined;
  parentUsername: string | undefined;

  @ViewChild('addComment')
  addComment: ElementRef | undefined;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private _newPostMobileService: NewPostMobileService,
    private location: Location,
    private scroller: ViewportScroller
  ) {
    this.form = this._newPostMobileService.buildForm();
  }

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

    this.postCommentsCount = this.postComments.length || 0;
    this.loggedInUser = await firstValueFrom(
      this._userService.userProfileGet()
    );

    if (this.post?.postId != null || this.post?.postId != undefined) {
      try {
        this.parentPost = await firstValueFrom(
          this._postService.postIdGet(this.post.postId)
        );

        this.parentPostAuthor = await firstValueFrom(
          this._userService.userIdGet(this.parentPost.userId)
        );
        this.parentUsername = "Reply to: @" + this.parentPostAuthor.username;
      } catch (error: any) {
        this.parentPost = { id: "", userId: "", creationDate: new Date(), mediaUrl: "", content: "", postId: undefined, isLiked: false };
        this.parentUsername = "Replied post was deleted";
      }
    }
    var usernames = this.post!.content.match(/@[A-Za-z0-9-_]*/g) || [];
    if (usernames.length > 0) {
      usernames.forEach(async (username) => {
        try {
          var user = await firstValueFrom(
            this._userService.userProfileUsernameGet(username.substring(1))
          );
          this.content!.nativeElement.innerHTML = this.content!.nativeElement.innerHTML.replace(
            username,
            `<a style="color:#ffd740;text-decoration:none;" href="/users/${user.username}">${user.displayName}</a> `
          )
        } catch (error: any) {
        }
      });
    }
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

  openNewComment() {
    if (!this.loggedInUser) 
    {
      this.snackBar.open('You must be logged in to comment!', 'Close', {
        duration: 2000,
      });
      return;
    }
    if (window.location.href.includes('/post')){
      this.showNewComment = !this.showNewComment;
      this.scrollToView();
    } else{
      this.router.navigate(['post', this.post?.id]);
    }
  }

  scrollToView() {
    setTimeout(() => {
      this.addComment?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
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

  async createComment() {
    this.form.disable();

    var login = localStorage.getItem('token')!;

    this._postService.defaultHeaders = this._postService.defaultHeaders.set(
      'Authorization',
      'Bearer ' + login
    );

    this.form.patchValue({ creationDate: new Date(), postId: this.post!.id, userId: this.loggedInUser!.id });
    try {
      
      const comment = await firstValueFrom(this._postService.postPost(this.form.value));
      
      this.postComments.push(comment);
      this.postCommentsCount++;

      this.form.enable();
      this.snackBar.open('Post created successfully!', 'Close', {
        duration: 5000,
      });
      if(window.location.href.includes('/post')){
        this.refreshComment.emit(true);
      }else{
        this.location.go('/post/' + this.post?.id);
      }

      this.form = this._newPostMobileService.buildForm();
      this.form.patchValue({ userId: this.loggedInUser!.id });
      this.showNewComment = false;
    } catch (error: any) {
      this.snackBar.open(error.error, 'Close', {
        duration: 5000,
      });
      this.form.enable();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target?.files[0];

    if (file) {
      // Convert to base64
      const reader = new FileReader();
      reader.onload = () => {
        this.form.patchValue({ mediaURL: reader.result as string });
      };
      reader.readAsDataURL(file);

      // const formData = new FormData();
      // formData.append('thumbnail', file);
      // const upload$ = this.http.post('/api/thumbnail-upload', formData);
      // upload$.subscribe();
    }
  }
  async deletePost() {
    if (!this.post) return;

    await firstValueFrom(this._postService.postIdDelete(this.post.id));

    this.snackBar.open('Post deleted successfully!', 'Close', {
      duration: 5000,
    });
    window.location.reload();
  }

  async goToParentPost() {
    if (this.parentPost?.id == "" || this.parentPost?.id == '') return;

    this.router.navigate(['post', this.parentPost?.id]);
  }

  async goToPost() {
    if (!this.post) return;
    this.router.navigate(['post', this.post.id]);
  }
}
