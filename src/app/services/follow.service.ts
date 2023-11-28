import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FollowerService } from '../api';
import { Guid } from 'guid-typescript';
import { Follower } from '../api/model/follower';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private followerService:FollowerService) { }

  async followUser(followerUser:string, followingUser:string):Promise<Follower>{
    this.followerService.defaultHeaders = this.followerService.defaultHeaders.set("Authorization", "Bearer " + localStorage.getItem("token"));
      return await firstValueFrom(
      this.followerService.followerPost({
        id: Guid.create().toString(),
        followerUserId: followerUser,
        followingUserId: followingUser,
        creationDate: new Date()
      })
      );
  }

  async unfollowUser(followerList:Follower[], unfollowingUser:string):Promise<Follower[]>{
    console.log(followerList);
    console.log(unfollowingUser);
    this.followerService.defaultHeaders = this.followerService.defaultHeaders.set("Authorization", "Bearer " + localStorage.getItem("token"));
    await firstValueFrom(
      this.followerService.followerIdDelete(followerList.find(follower => follower.followingUserId == unfollowingUser)!.id)
      );
    return followerList.filter(follower => follower.followingUserId != unfollowingUser);
  }
}
