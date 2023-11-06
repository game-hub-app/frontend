export * from './auth.service';
import { AuthService } from './auth.service';
export * from './community.service';
import { CommunityService } from './community.service';
export * from './follower.service';
import { FollowerService } from './follower.service';
export * from './like.service';
import { LikeService } from './like.service';
export * from './post.service';
import { PostService } from './post.service';
export * from './user.service';
import { UserService } from './user.service';
export * from './userCommunities.service';
import { UserCommunitiesService } from './userCommunities.service';
export const APIS = [
  AuthService,
  CommunityService,
  FollowerService,
  LikeService,
  PostService,
  UserService,
  UserCommunitiesService,
];
