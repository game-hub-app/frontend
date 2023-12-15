import { Component, OnInit, HostListener } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Post, PostService, User } from 'src/app/api';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  isMobile: boolean = false;

  posts: Post[] = [];
  followingPosts: Post[] = [];
  loggedInUser: User = JSON.parse(localStorage.getItem('user') ?? '{}');

  constructor(private _postService: PostService) {}

  async ngOnInit() {
    if (!localStorage.getItem('token')) {
      console.log('No token found, redirecting to landing page.');
      localStorage.clear();
      window.location.href = '/';
    }
    this.onResize();

    this.refreshPosts();
  }

  async refreshPosts() {
    var posts = await firstValueFrom(this._postService.postGet());

    this.posts = posts.filter((post) => post.postId == null);
    this.posts.sort((a, b) => (a.creationDate < b.creationDate ? 1 : -1));

    var followingPosts = await firstValueFrom(
      this._postService.postFollowingGet()
    );

    this.followingPosts = followingPosts.filter((post) => post.postId == null);
    this.followingPosts.sort((a, b) =>
      a.creationDate < b.creationDate ? 1 : -1
    );
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
