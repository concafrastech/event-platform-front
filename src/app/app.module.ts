// Modules
import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { MomentModule } from 'ngx-moment';
import { NgxSpinnerModule } from "ngx-spinner";
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DatetimePopupModule } from 'ngx-bootstrap-datetime-popup';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';

// Module Custom
import { MessagesModule} from './messages/messages.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './epics/main/home/home.component';
import { UsersComponent } from './social-network/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './social-network/timeline/timeline.component';
import { PublicationsComponent } from './social-network/publications/publications.component';
import { ProfileComponent } from './social-network/profile/profile.component';
import { FollowingComponent } from './social-network/following/following.component';
import { FollowedComponent } from './social-network/followed/followed.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { HubComponent } from './epics/main/hub/hub.component';
import { AudithoriumComponent } from './epics/main/audithorium/audithorium.component';
import { SelectJourneyComponent } from './components/select-journey/select-journey.component';
import { EventComponent } from './epics/main/event/event.component';
import { IframeComponent } from './components/channels/iframe/iframe.component';
import { ConferenceListComponent } from './admin/conference/conference-list/conference-list.component';
import { ConferenceEditComponent } from './admin/conference/conference-edit/conference-edit.component';
import { ConferenceAddComponent } from './admin/conference/conference-add/conference-add.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserAddComponent } from './admin/user/user-add/user-add.component';
import { UserEditComponent } from './admin/user/user-edit/user-edit.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { EpicAddComponent } from './admin/epic/epic-add/epic-add.component';
import { EpicEditComponent } from './admin/epic/epic-edit/epic-edit.component';
import { EpicListComponent } from './admin/epic/epic-list/epic-list.component';
import { LectureListComponent } from './admin/lecture/lecture-list/lecture-list.component';
import { LectureEditComponent } from './admin/lecture/lecture-edit/lecture-edit.component';
import { LectureAddComponent } from './admin/lecture/lecture-add/lecture-add.component';
//import { YoutubeComponent } from './pages/channels/youtube/youtube.component';
//import { FlvplayerComponent } from './pages/channels/flvplayer/flvplayer.component';
//import { VideojsComponent } from './pages/channels/videojs/videojs.component';

// Services
import { UserService } from './services/user.service';
import { UserGuard } from './services/user.guard';
import { GamificationModule } from 'angular-gamification';
import { NgBootstrapAlertModule } from 'ng-bootstrap-alert';
import { AngularTawkComponent, AngularTawkModule } from 'angular-tawk';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ContentComponent } from './admin/content/content.component';
import { SocialDashboardComponent } from './social-network/social-dashboard/social-dashboard.component';
import { SocialHomeComponent } from './social-network/social-home/social-home.component';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { InterceptorModule } from './utils/interceptor.module';
import { TrailListComponent } from './admin/trail/trail-list/trail-list.component';
import { TrailEditComponent } from './admin/trail/trail-edit/trail-edit.component';
import { TrailAddComponent } from './admin/trail/trail-add/trail-add.component';
import { ClassroomListComponent } from './admin/classroom/classroom-list/classroom-list.component';
import { ClassroomEditComponent } from './admin/classroom/classroom-edit/classroom-edit.component';
import { ClassroomAddComponent } from './admin/classroom/classroom-add/classroom-add.component';
import { DocumentEditComponent } from './admin/document/document-edit/document-edit.component';
import { DocumentListComponent } from './admin/document/document-list/document-list.component';
import { JovemHomeComponent } from './epics/jovem/jovem-home/jovem-home.component';
import { JovemDashboardComponent } from './epics/jovem/jovem-dashboard/jovem-dashboard.component';
import { InfanciaHomeComponent } from './epics/infancia/infancia-home/infancia-home.component';
import { InfanciaDashboardComponent } from './epics/infancia/infancia-dashboard/infancia-dashboard.component';
import { ContentTimeDirective } from './directives/form-validators/content-time.directive';
import { StageListComponent } from './admin/stage/stage-list/stage-list.component';
import { StageEditComponent } from './admin/stage/stage-edit/stage-edit.component';
import { StageAddComponent } from './admin/stage/stage-add/stage-add.component';
import { ActivityListComponent } from './admin/activity/activity-list/activity-list.component';
import { ActivityEditComponent } from './admin/activity/activity-edit/activity-edit.component';
import { ActivityAddComponent } from './admin/activity/activity-add/activity-add.component';
import { InfanciaLevelComponent } from './epics/infancia/infancia-level/infancia-level.component';
import { InfanciaAudithoriumComponent } from './epics/infancia/infancia-audithorium/infancia-audithorium.component';
import { InfanciaGeralComponent } from './epics/infancia/infancia-geral/infancia-geral.component';
import { SelectConferenceComponent } from './components/select-conference/select-conference.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ChartComponent } from './components/chart/chart.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { VideojsComponent } from './components/channels/videojs/videojs.component';
import { SafePipe } from './utils/safe.pipe';

const levels = [
  { badge: 'BEGINNER', icon: './../assets/badges/BEGINNER.svg', range: { min: 1, max: 99 } },
  { badge: 'NICE', icon: './../assets/badges/NICE.svg', range: { min: 100, max: 199 } },
  { badge: 'USUAL', icon: './../assets/badges/USUAL.svg', range: { min: 200, max: 299 } },
  { badge: 'CONSTANT', icon: './../assets/badges/CONSTANT.svg', range: { min: 300, max: 399 } },
  { badge: 'VIP', icon: './../assets/badges/VIP.svg', range: { min: 400, max: 499 } },
  { badge: 'NINJA', icon: './../assets/badges/NINJA.svg', range: { min: 500, max: 599 } },
  { badge: 'POWER', icon: './../assets/badges/POWER.svg', range: { min: 600, max: 699 } },
  { badge: 'PARTNER', icon: './../assets/badges/PARTNER.svg', range: { min: 700, max: 799 } },
  { badge: 'LORD', icon: './../assets/badges/LORD.svg', range: { min: 800, max: 899 } },
  { badge: 'KING', icon: './../assets/badges/KING.svg', range: { min: 900, max: 999 } }
];

const levelsConcafras2021 = [
  { badge: 'TERRA', icon: './../assets/badges/BEGINNER.svg', range: { min: 1, max: 149 } },
  { badge: 'MARTE', icon: './../assets/badges/NICE.svg', range: { min: 150, max: 299 } },
  { badge: 'VENUS', icon: './../assets/badges/USUAL.svg', range: { min: 300, max: 699 } },
  { badge: 'JUPITER', icon: './../assets/badges/CONSTANT.svg', range: { min: 700, max: 899 } },
  { badge: 'SOL', icon: './../assets/badges/VIP.svg', range: { min: 900, max: 2000 } },
];


const GamificationConfig = {
  levels: levelsConcafras2021
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    WelcomeComponent,
    ProfileEditComponent,
    SocialDashboardComponent,
    SocialHomeComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationsComponent,
    ProfileComponent,
    FollowingComponent,
    FollowedComponent,
    TutorialComponent,
    HubComponent,
    AudithoriumComponent,
    SelectJourneyComponent,
    EventComponent,
    IframeComponent,
    ContentComponent,
    ConferenceListComponent,
    ConferenceEditComponent,
    ConferenceAddComponent,
    EpicListComponent,
    EpicEditComponent,
    EpicAddComponent,
    UserListComponent,
    UserEditComponent,
    UserAddComponent,
    LectureListComponent,
    LectureEditComponent,
    LectureAddComponent,
    TrailListComponent,
    TrailEditComponent,
    TrailAddComponent,
    ClassroomListComponent,
    ClassroomEditComponent,
    ClassroomAddComponent,
    DocumentEditComponent,
    DocumentListComponent,
    StageListComponent,
    StageEditComponent,
    StageAddComponent,
    ActivityListComponent,
    ActivityEditComponent,
    ActivityAddComponent,
    DashboardComponent,
    DeleteConfirmComponent,
    JovemHomeComponent,
    JovemDashboardComponent,
    InfanciaHomeComponent,
    InfanciaDashboardComponent,
    ContentTimeDirective,
    InfanciaLevelComponent,
    InfanciaAudithoriumComponent,
    InfanciaGeralComponent,
    SelectConferenceComponent,
    ConfirmComponent,
    ChartComponent,
    ScheduleComponent,
    //YoutubeComponent,
    //FlvplayerComponent,
    VideojsComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    routing,
    HttpClientModule,
    InterceptorModule,
    MomentModule,
    MessagesModule,
    GamificationModule.forRoot(GamificationConfig),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    DatetimePopupModule,
    NgBootstrapAlertModule,
    AngularTawkModule,
    NgxSpinnerModule,
    ChartsModule
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    //HttpClientInMemoryWebApiModule.forRoot(
    //  InMemoryDataService, { dataEncapsulation: false }
    //)
  ],
  providers: [
      appRoutingProviders,
      UserService,
      UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }