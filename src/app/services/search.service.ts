import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Community, User, Post, CommunityService, UserService, PostService } from 'src/app/api';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private _communityService: CommunityService,
    private _userService: UserService,
    private _postService: PostService
  ) { }

  async searchCommunities(searchTerm: string): Promise<Community[]> {
  const communities = await firstValueFrom(this._communityService.communitySearchGet(searchTerm));
  return communities;
  }

  async searchUsers(searchTerm: string): Promise<User[]> {
    const users = await firstValueFrom(this._userService.userSearchGet(searchTerm));
    return users;
  }

  async searchPosts(searchTerm: string): Promise<Post[]> {
    const posts = await firstValueFrom(this._postService.postSearchGet(searchTerm));
    return posts;
  }
}
