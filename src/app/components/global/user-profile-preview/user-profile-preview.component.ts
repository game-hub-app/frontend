import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile-preview',
  templateUrl: './user-profile-preview.component.html',
  styleUrls: ['./user-profile-preview.component.css']
})
export class UserProfilePreviewComponent {
  follows = true;
  shownUser = JSON.parse(localStorage.getItem("user")??"{}");
}
