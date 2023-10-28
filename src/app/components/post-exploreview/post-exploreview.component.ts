import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-post-exploreview',
  templateUrl: './post-exploreview.component.html',
  styleUrls: ['./post-exploreview.component.css']
})
export class PostExploreviewComponent implements OnInit{

  likeCount: number = 0;  // Like count
  commentCount: number = 0;  // Comment count
  username: string = "username";  // Username
  handlertag: string = "handlertag";  // Handler tag
  postContent: string = "postContent";  // Post content
  constructor() { }

  ngOnInit(): void {
  }

}
