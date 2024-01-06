import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/api/model/user';
import { NewPostMobileService } from 'src/app/services/new-post-mobile.service';
import { FormGroup } from '@angular/forms';
import { PostService } from 'src/app/api';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {

  loggedUser: any = JSON.parse(localStorage.getItem('user')!);

  @Input() communityId?: string;
  @ViewChild('fileUpload') fileInput: ElementRef | undefined;
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

  resetImage(){
    this.form.get('mediaURL')?.setValue(null);
    if(this.fileInput){
      this.fileInput.nativeElement.value = "";
    }

  }
  goBack() {
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

  savePost() {
  }
  cancel() {
    
  }

}
