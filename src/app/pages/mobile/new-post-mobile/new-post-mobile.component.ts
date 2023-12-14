import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/api/model/user';
import { NewPostMobileService } from 'src/app/services/new-post-mobile.service';
import { FormGroup } from '@angular/forms';
import { PostService } from 'src/app/api';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-post-mobile',
  templateUrl: './new-post-mobile.component.html',
  styleUrls: ['./new-post-mobile.component.css'],
})
export class NewPostMobileComponent {
  loggedUser: User = JSON.parse(localStorage.getItem('user')!);

  @Input() communityId?: string;

  form: FormGroup;

  constructor(
    private _location: Location,
    private _newPostMobileService: NewPostMobileService,
    private _postService: PostService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this._newPostMobileService.buildForm();

    if (this.communityId) {
      this.form.patchValue({ communityId: this.communityId });
    }

    this.form.patchValue({ userId: this.loggedUser.id });
  }

  async createPost() {
    this.form.disable();

    var login = localStorage.getItem('token')!;

    this._postService.defaultHeaders = this._postService.defaultHeaders.set(
      'Authorization',
      'Bearer ' + login
    );

    this.form.patchValue({ creationDate: new Date() });

    try {
      var post = await firstValueFrom(
        this._postService.postPost(this.form.value)
      );

      this._snackBar.open('Post created successfully!', 'Close', {
        duration: 5000,
      });

      this.goBack();
    } catch (error: any) {
      this._snackBar.open(error.error, 'Close', {
        duration: 5000,
      });

      this.form.enable();
    }
  }

  goBack() {
    this._location.back();
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

  uploadMedia() {}
}
