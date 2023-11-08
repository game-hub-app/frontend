import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { CommunityComponent } from './pages/community/community.component'
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewPostMobileComponent } from './pages/mobile/new-post-mobile/new-post-mobile.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'new-post-mobile',
    component: NewPostMobileComponent
  },
  {
    path: 'community',
    component: CommunityComponent
  },
    {
    path: "feed",
    component: StartPageComponent,
  },
  {
    path: "register",
    component: RegisterPageComponent,
  },
  {
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: "",
    component: LandingPageComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
