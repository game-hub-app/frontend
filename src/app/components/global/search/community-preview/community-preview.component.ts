import { Component, Input } from '@angular/core';
import { Community } from 'src/app/api';

@Component({
  selector: 'app-community-preview',
  templateUrl: './community-preview.component.html',
  styleUrls: ['./community-preview.component.css']
})
export class CommunityPreviewComponent {

  @Input() community: Community = {} as Community;

  ngOnInit(): void {
  }
}
