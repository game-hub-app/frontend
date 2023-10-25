import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { CommunityComponent } from './pages/community/community.component'

const routes: Routes = [
  {
    path: 'community',
    component: CommunityComponent
  },
  {
    path: "**",
    component: StartPageComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
