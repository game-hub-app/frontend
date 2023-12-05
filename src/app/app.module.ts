import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartPageComponent } from './pages/start-page/start-page.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { CommunityComponent } from './pages/community/community.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewPostExploreviewComponent } from './components/new-post-exploreview/new-post-exploreview.component';
import { NewPostMobileComponent } from './pages/mobile/new-post-mobile/new-post-mobile.component';
import { FeedComponent } from './pages/general/feed/feed.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';
import { ToolbarComponent } from './components/navigation/toolbar/toolbar.component';
import { MobilenavComponent } from './components/navigation/mobilenav/mobilenav.component';
import { ApiModule, Configuration } from './api';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserProfilePreviewComponent } from './components/global/user-profile-preview/user-profile-preview.component';
import { PostDetailComponent } from './pages/post/post-detail/post-detail.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { FollowListComponent } from './components/profile/follow-list/follow-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PostComponent } from './components/global/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    LandingPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    CommunityComponent,
    NewPostExploreviewComponent,
    NewPostMobileComponent,
    FeedComponent,
    SidenavComponent,
    ToolbarComponent,
    MobilenavComponent,
    ProfileComponent,
    EditProfileComponent,
    UserProfilePreviewComponent,
    PostDetailComponent,
    DateAgoPipe,
    FollowListComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
    MatTabsModule,
    ImageCropperModule,
    ApiModule.forRoot(() => {
      return new Configuration({
        basePath: 'https://game-hub-api.azurewebsites.net',
      });
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
