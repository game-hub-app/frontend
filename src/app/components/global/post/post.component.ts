import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Post, User, PostService, UserService } from 'src/app/api';
import { Location } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NewPostMobileService } from 'src/app/services/new-post-mobile.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnChanges {
  @Input() post: Post | undefined;
  @Output() refreshComment = new EventEmitter<boolean>();
  postAuthor: User | undefined;
  postLikes: number = 0;
  postCommentsCount: number = 0;
  postComments: Post[] = [];
  loggedInUser: User | undefined;
  showNewComment: boolean = false;
  form: FormGroup;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private _newPostMobileService: NewPostMobileService,
    private location: Location
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
    console.log(this.postCommentsCount);
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
      console.log(this.postComments);
    } else{
      this.router.navigate(['post', this.post?.id]);
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
      console.log(comment);
      
      this.postComments.push(comment);
      this.postCommentsCount++;

      this.form.enable();
      this.snackBar.open('Post created successfully!', 'Close', {
        duration: 5000,
      });
      this.refreshComment.emit(true);
      this.form = this._newPostMobileService.buildForm();
      this.showNewComment = false;
      // this.form.reset(); se comentar isto ajudar, o david vai me fazer 2 filhos - assinado: ver git blame
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
        console.log(this.form.value);
      };
      reader.readAsDataURL(file);

      // const formData = new FormData();
      // formData.append('thumbnail', file);
      // const upload$ = this.http.post('/api/thumbnail-upload', formData);
      // upload$.subscribe();
    }
  }

  async goToPost() {
    if (!this.post) return;

    this.router.navigate(['post', this.post.id]);
  }
}
