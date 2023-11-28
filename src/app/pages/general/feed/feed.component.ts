import { Component, OnInit, HostListener } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Post, PostService } from 'src/app/api';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  isMobile: boolean = false;

  posts: Post[] = [];

  constructor(private _postService: PostService) {}

  async ngOnInit() {
    this.onResize();

    var posts = await firstValueFrom(this._postService.postGet());

    this.posts = posts.reverse();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    if (window.innerWidth < 650) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
}
