import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/api/model/user';
import { FormGroup } from '@angular/forms';
import { Operation, Post, PostService } from 'src/app/api';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EditPostService } from 'src/app/services/edit-post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit{

  loggedUser: any = JSON.parse(localStorage.getItem('user')!);

  @Input() communityId?: string;
  @ViewChild('fileUpload') fileInput: ElementRef | undefined;
  form: FormGroup;
  id:string = "";

  constructor(
    private _location: Location,
    private _editPostService: EditPostService,
    private _postService: PostService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.form = this._editPostService.buildForm();

    if (this.communityId) {
      this.form.patchValue({ communityId: this.communityId });
    }

    this.form.patchValue({ userId: this.loggedUser.id });
  }

  async ngOnInit(){
    this.route.paramMap.subscribe(async (params) => {
      this.id = params.get('id')!;
      var post = await firstValueFrom(this._postService.postIdGet(this.id));
      if (post.userId != this.loggedUser.id) {
        this.goBack();
      }
      this.form.patchValue(post);
    });
  }

  async editPost() {
    this.form.disable();

    var login = localStorage.getItem('token')!;

    this._postService.defaultHeaders = this._postService.defaultHeaders.set(
      'Authorization',
      'Bearer ' + login
    );

    var editPost:Post = this.form.value;
    let operation =[
      {op: "replace", path: "/content", value: editPost.content},
      {op: "replace", path: "/mediaUrl", value: editPost.mediaUrl ? editPost.mediaUrl : null},
    ] as Operation[];
    console.log(editPost);

    try {
      await firstValueFrom(
        this._postService.postIdPatch(this.id, operation)
      );

      this._snackBar.open('Post edited successfully!', 'Close', {
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
    this.form.get('mediaUrl')?.setValue(null);
    if(this.fileInput){
      this.fileInput.nativeElement.value = "";
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
        this.form.patchValue({ mediaUrl: reader.result as string });
        console.log(this.form.value)
      };
      reader.readAsDataURL(file);
    }
  }
}
