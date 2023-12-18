import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CreateCommunityPageService {
  constructor() {}

  buildForm() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      iconURL: new FormControl('', [Validators.required]),
      bannerURL: new FormControl('', [Validators.required]),
    });
  }
}
