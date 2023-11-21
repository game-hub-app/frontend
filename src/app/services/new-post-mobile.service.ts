import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../api';

@Injectable({
  providedIn: 'root',
})
export class NewPostMobileService {
  constructor() {}

  buildForm(): FormGroup<any> {
    return new FormGroup(
      {
        userId: new FormControl('', []),
        content: new FormControl('', [Validators.required]),
        mediaURL: new FormControl('', []),
        communityId: new FormControl(''),
        creationDate: new FormControl(new Date(), []),
      }
    );
  }
}
