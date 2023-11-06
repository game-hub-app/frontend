import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-post-mobile',
  templateUrl: './new-post-mobile.component.html',
  styleUrls: ['./new-post-mobile.component.css']
})
export class NewPostMobileComponent {

  @Input() communityId?: string;

  constructor(private _location: Location) {
  }

  goBack() {
    this._location.back();
  }
}
