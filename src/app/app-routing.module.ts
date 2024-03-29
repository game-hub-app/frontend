import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { CommunityComponent } from './pages/community/community.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewPostMobileComponent } from './pages/mobile/new-post-mobile/new-post-mobile.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { PostDetailComponent } from './pages/post/post-detail/post-detail.component';
import { CreateCommunityPageComponent } from './pages/create-community-page/create-community-page.component';
import { EditPostComponent } from './components/global/edit-post/edit-post.component';
import { CommunityListMobileComponent } from './pages/mobile/community-list-mobile/community-list-mobile.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  {
    path: 'search',
    component:SearchComponent,
  },
  {
    path: 'post/:id',
    component: PostDetailComponent,
  },
  {
    path: 'community-list',
    component: CommunityListMobileComponent,
  },
  {
    path: 'edit-post/:id',
    component: EditPostComponent,
  },
  {
    path: 'users/:username',
    component: ProfileComponent,
  },
  {
    path: 'new-post-mobile',
    component: NewPostMobileComponent,
  },
  {
    path: 'create-community',
    component: CreateCommunityPageComponent,
  },
  {
    path: 'community/:id',
    component: CommunityComponent,
  },
  {
    path: 'feed',
    component: StartPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    component: LandingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
