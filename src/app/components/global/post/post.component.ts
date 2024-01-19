import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('content') content: ElementRef | undefined;
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

    this.postAuthor = this.post.user;

    this.postLikes = this.post.likes?.length || 0;

    this.postComments = this.post.comments || [];

    this.postCommentsCount = this.postComments.length || 0;

    this.loggedInUser = JSON.parse(localStorage.getItem('user')!) as User;

    if (this.post?.postId != null || this.post?.postId != undefined) {
      try {
        this.parentPost = await firstValueFrom(
          this._postService.postIdGet(this.post.postId)
        );

        this.parentPostAuthor = this.parentPost.user;

        this.parentUsername = 'Reply to: @' + this.parentPostAuthor?.username;
      } catch (error: any) {
        this.parentPost = {
          id: '',
          userId: '',
          creationDate: new Date(),
          mediaUrl: '',
          content: '',
          postId: undefined,
          isLiked: false,
        };
        this.parentUsername = 'Replied post was deleted';
      }
    }
    var usernames = this.post!.content.match(/@[A-Za-z0-9-_]*/g) || [];
    if (usernames.length > 0) {
      var users = await firstValueFrom(this._userService.userGet());    
      usernames.forEach(async (username) => {
        try {
          var user = users.find((u) => u.username == username.replace('@', ''));

          if (!user) return;

          this.content!.nativeElement.innerHTML =
            this.content!.nativeElement.innerHTML.replace(
              username,
              `<a style="color:#ffd740;text-decoration:none;" href="/users/${user.username}">${user.displayName}</a> `
            );
        } catch (error: any) {}
      });
    }

    var links = this.post.content.match(/https?:\/\/[^\s]+/g) || [];
    if (links.length > 0) {
      setTimeout(() => {
        links.forEach(async (link) => {
          try {
            // If link is YouTube - append embed
            if (link.includes('youtube.com/watch') || link.includes('youtu.be')) {
              var videoId = link.split('v=')[1] || link.split('youtu.be/')[1];
              if (this.content?.nativeElement) {
                this.content.nativeElement.innerHTML =
                  this.content.nativeElement.innerHTML.replace(
                    link,
                    `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                  );
              }
              return;
            }

            // If link is Spotify - append embed
            if (link.includes('open.spotify.com')) {
              // Check if it's a playlist, album, track, artist or user
              var spotifyId = link.split('open.spotify.com/')[1];

              var type = spotifyId.split('/')[0];

              if (spotifyId.includes('playlist')) {
                spotifyId = spotifyId.split('playlist/')[1];
              } else if (spotifyId.includes('album')) {
                spotifyId = spotifyId.split('album/')[1];
              } else if (spotifyId.includes('track')) {
                spotifyId = spotifyId.split('track/')[1];
              } else if (spotifyId.includes('artist')) {
                spotifyId = spotifyId.split('artist/')[1];
              } else if (spotifyId.includes('episode')) {
                spotifyId = spotifyId.split('episode/')[1];
              } else {
                // Not supported - fallback to default link
                if (this.content?.nativeElement) {
                  this.content.nativeElement.innerHTML =
                    this.content.nativeElement.innerHTML.replace(
                      link,
                      `<a style="color:#ffd740;text-decoration:none;" href="${link}">${link}</a> `
                    );
                }
                return;
              }


              if (this.content?.nativeElement) {
                this.content.nativeElement.innerHTML =
                  this.content.nativeElement.innerHTML.replace(
                    link,
                    `<iframe src="https://open.spotify.com/embed/${type}/${spotifyId}" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
                  );
              }
              return;
            }

            if (this.content?.nativeElement) {
              this.content.nativeElement.innerHTML =
                this.content.nativeElement.innerHTML.replace(
                  link,
                  `<a style="color:#ffd740;text-decoration:none;" href="${link}">${link}</a> `
                );
            }
          } catch (error: any) {
            console.log(error);
          }
        });
      }, 0);
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
    if (!this.loggedInUser) {
      this.snackBar.open('You must be logged in to comment!', 'Close', {
        duration: 2000,
      });
      return;
    }
    if (window.location.href.includes('/post')) {
      this.showNewComment = !this.showNewComment;
      this.scrollToView();
    } else {
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

    this.form.patchValue({
      creationDate: new Date(),
      postId: this.post!.id,
      userId: this.loggedInUser!.id,
    });
    try {
      const comment = await firstValueFrom(
        this._postService.postPost(this.form.value)
      );

      this.postComments.push(comment);
      this.postCommentsCount++;

      this.form.enable();
      this.snackBar.open('Post created successfully!', 'Close', {
        duration: 5000,
      });
      if (window.location.href.includes('/post')) {
        this.refreshComment.emit(true);
      } else {
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
    if (this.parentPost?.id == '' || this.parentPost?.id == '') return;

    this.router.navigate(['post', this.parentPost?.id]);
  }

  async goToPost() {
    if (!this.post) return;
    this.router.navigate(['post', this.post.id]);
  }
}
