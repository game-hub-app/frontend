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
import { MatListModule } from '@angular/material/list';
import { CommIconComponent } from './components/comm-icon/comm-icon.component';
import { CommunityComponent } from './pages/community/community.component';
import { PostExploreviewComponent } from './components/post-exploreview/post-exploreview.component';
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

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    LandingPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    CommIconComponent,
    CommunityComponent,
    PostExploreviewComponent,
    NewPostExploreviewComponent,
    NewPostMobileComponent,
    FeedComponent,
    SidenavComponent,
    ToolbarComponent,
    MobilenavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
    ApiModule.forRoot(() => {
      return new Configuration({
        basePath: 'http://game-hub-api.azurewebsites.net',
      });
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
