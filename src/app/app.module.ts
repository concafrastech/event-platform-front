// Modules
import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { MomentModule } from 'ngx-moment';

// Module Custom
import { MessagesModule} from './messages/messages.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

// Services
import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';
//import { YoutubeComponent } from './pages/channels/youtube/youtube.component';
//import { WelcomeComponent } from './pages/welcome/welcome.component';
//import { AudithoriumComponent } from './pages/audithorium/audithorium.component';
//import { FlvplayerComponent } from './pages/channels/flvplayer/flvplayer.component';
//import { VideojsComponent } from './pages/channels/videojs/videojs.component';
//import { HubComponent } from './pages/hub/hub.component';
import { HeroesModule } from './heroes/heroes.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    //YoutubeComponent,
    //WelcomeComponent,
    //AudithoriumComponent,
    //FlvplayerComponent,
    //VideojsComponent,
    //HubComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationsComponent,
    ProfileComponent,
    FollowingComponent,
    FollowedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule,
    MomentModule,
    MessagesModule,
    HeroesModule
  ],
  providers: [
      appRoutingProviders,
      UserService,
      UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
