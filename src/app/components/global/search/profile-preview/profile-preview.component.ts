import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/api';

@Component({
  selector: 'app-profile-preview',
  templateUrl: './profile-preview.component.html',
  styleUrls: ['./profile-preview.component.css']
})
export class ProfilePreviewComponent {
  @Input() user: User = {} as User;
}
