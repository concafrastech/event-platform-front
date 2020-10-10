import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AudithoriumComponent } from './pages/audithorium/audithorium.component';
import { YoutubeComponent } from './pages/channels/youtube/youtube.component';
import { HomeComponent } from './pages/home/home.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'youtube',
    component: YoutubeComponent
  },
  {
    path: 'audithorium',
    component: AudithoriumComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
