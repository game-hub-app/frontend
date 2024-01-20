import { Component, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { Community, PostService, CommunityService } from 'src/app/api';
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
  @Input() communityId:string | undefined = undefined;
  @ViewChild('fileUpload') fileInput: ElementRef | undefined;
  community:Community | undefined = undefined;

  form: FormGroup;

  constructor(
    private _newPostMobileService: NewPostMobileService,
    private _snackBar: MatSnackBar,
    private _postService: PostService,
    private _communityService: CommunityService
  ) {
    this.form = this._newPostMobileService.buildForm();
    if (this.loggedUser != null){
      this.form.patchValue({ userId: this.loggedUser.id });
    }
  }

  async ngOnInit(): Promise<void> {
    if(this.communityId){
      try{
        this.community = await firstValueFrom(this._communityService.communityIdGet(this.communityId));
        this.form.patchValue({ communityId: this.communityId });
      }catch(err){
        console.log(err);
      }
    }
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
      await firstValueFrom(this._postService.postPost(this.form.value));

      this._snackBar.open('Post created successfully!', 'Close', {
        duration: 5000,
      });
      this.form.enable();

      this.refreshPosts.emit(true);
      this.resetImage();
      this.form = this._newPostMobileService.buildForm();
      this.form.patchValue({ userId: this.loggedUser.id });
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
