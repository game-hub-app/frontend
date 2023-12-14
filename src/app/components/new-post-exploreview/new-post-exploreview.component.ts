import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { PostService } from 'src/app/api';
import { User } from 'src/app/api/model/user';
import { NewPostMobileService } from 'src/app/services/new-post-mobile.service';
@Component({
  selector: 'app-new-post-exploreview',
  templateUrl: './new-post-exploreview.component.html',
  styleUrls: ['./new-post-exploreview.component.css'],
})
export class NewPostExploreviewComponent {
  loggedUser: User = JSON.parse(localStorage.getItem('user')!);
  @Output() refreshPosts = new EventEmitter<boolean>();

  form: FormGroup;

  constructor(
    private _newPostMobileService: NewPostMobileService,
    private _snackBar: MatSnackBar,
    private _postService: PostService
  ) {
    this.form = this._newPostMobileService.buildForm();

    this.form.patchValue({ userId: this.loggedUser.id });
  }

  ngOnInit(): void {}

  async createPost() {
    this.form.disable();

    var login = localStorage.getItem('token')!;

    this._postService.defaultHeaders = this._postService.defaultHeaders.set(
      'Authorization',
      'Bearer ' + login
    );

    this.form.patchValue({ creationDate: new Date() });

    try {
      await firstValueFrom(this._postService.postPost(this.form.value));

      this._snackBar.open('Post created successfully!', 'Close', {
        duration: 5000,
      });
      this.form.enable();

      this.refreshPosts.emit(true);
      this.form = this._newPostMobileService.buildForm();
      this.form.patchValue({ userId: this.loggedUser.id });
    } catch (error: any) {
      this._snackBar.open(error.error, 'Close', {
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
}
