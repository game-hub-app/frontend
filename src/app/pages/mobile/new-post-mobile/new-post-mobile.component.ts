import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/api/model/user';

@Component({
  selector: 'app-new-post-mobile',
  templateUrl: './new-post-mobile.component.html',
  styleUrls: ['./new-post-mobile.component.css']
})
export class NewPostMobileComponent {
  loggedUser:User = JSON.parse(localStorage.getItem('user')!);
  
  @Input() communityId?: string;

  constructor(private _location: Location) {
  }

  goBack() {
    this._location.back();
  }
}
