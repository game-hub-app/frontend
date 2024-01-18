import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EditPostService {

  constructor() { }

  buildForm(): FormGroup<any> {
    return new FormGroup({
      id: new FormControl('', []),
      userId: new FormControl('', []),
      postId: new FormControl('', []),
      communityId: new FormControl('', []),
      content: new FormControl('', [Validators.required]),
      mediaUrl: new FormControl(null, []),
      creationDate: new FormControl(new Date(), []),

    });
  }
}
