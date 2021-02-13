
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
import { TooltipModule } from 'ngx-bootstrap/tooltip';

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
import { InfanciaHomeComponent } from './epics/infancia/infancia-home/infancia-home.component';
import { InfanciaDashboardComponent } from './epics/infancia/infancia-dashboard/infancia-dashboard.component';
import { ContentTimeDirective } from './directives/form-validators/content-time.directive';
import { StageListComponent } from './admin/stage/stage-list/stage-list.component';
import { StageEditComponent } from './admin/stage/stage-edit/stage-edit.component';
import { StageAddComponent } from './admin/stage/stage-add/stage-add.component';
import { ActivityListComponent } from './admin/activity/activity-list/activity-list.component';
import { ActivityEditComponent } from './admin/activity/activity-edit/activity-edit.component';
import { ActivityAddComponent } from './admin/activity/activity-add/activity-add.component';
// import { InfanciaLevelComponent } from './epics/infancia/infancia-level/infancia-level.component';
import { InfanciaAudithoriumComponent } from './epics/infancia/infancia-audithorium/infancia-audithorium.component';
import { InfanciaGeralComponent } from './epics/infancia/infancia-geral/infancia-geral.component';
import { SelectConferenceComponent } from './components/select-conference/select-conference.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ChartComponent } from './components/chart/chart.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { VideojsComponent } from './components/channels/videojs/videojs.component';
import { SafePipe } from './utils/safe.pipe';
import { ZoomusComponent } from './components/channels/zoomus/zoomus.component';
import { TermosComponent } from './components/login/termos/termos.component';
import { AboutComponent } from './components/login/about/about.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
//import { ChatComponent } from './components/chat/chat.component';
import { JovemDashboardComponent } from './epics/jovem/jovem-dashboard/jovem-dashboard.component';
import { JovemHomeComponent } from './epics/jovem/jovem-home/jovem-home.component';
import { Ilha1Component } from './epics/jovem/pages/ilha1/ilha1.component';
import { Ilha2Component } from './epics/jovem/pages/ilha2/ilha2.component';
import { Ilha3Component } from './epics/jovem/pages/ilha3/ilha3.component';
import { Ilha4Component } from './epics/jovem/pages/ilha4/ilha4.component';
import { Ilha5Component } from './epics/jovem/pages/ilha5/ilha5.component';
import { Ilha1DialogoComponent} from './epics/jovem/pages/ilha1/ilha1-dialogo/ilha1-dialogo.component';
import { Ilha2DialogoComponent } from './epics/jovem/pages/ilha2/ilha2-dialogo/ilha2-dialogo.component';
import { Ilha3DialogoComponent } from './epics/jovem/pages/ilha3/ilha3-dialogo/ilha3-dialogo.component';
import { Ilha4DialogoComponent } from './epics/jovem/pages/ilha4/ilha4-dialogo/ilha4-dialogo.component';
import { Ilha5DialogoComponent } from './epics/jovem/pages/ilha5/ilha5-dialogo/ilha5-dialogo.component';
import { JogosTematicosComponent } from './epics/jovem/pages/ilha1/jogos-tematicos/jogos-tematicos.component';
import { MuralArtisticoComponent } from './epics/jovem/pages/ilha2/mural-artistico/mural-artistico.component';
import { AlegriaCristaMusicasComponent } from './epics/jovem/pages/ilha2/alegria-crista-musicas/alegria-crista-musicas.component';
import { LancamentosComponent } from './epics/jovem/pages/ilha5/lancamentos/lancamentos.component';
import { LeftSidebarComponent } from './epics/main/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './epics/main/right-sidebar/right-sidebar.component';
import { TendaComponent } from './epics/main/tenda/tenda.component';
import { EventCleanComponent } from './epics/main/event-clean/event-clean.component';
import { NdcComponent } from './epics/main/feira/ndc/ndc.component';
import { CecxComponent } from './epics/main/feira/cecx/cecx.component';
import { CfasComponent } from './epics/main/feira/cfas/cfas.component';
import { LivrosComponent } from './epics/main/feira/livros/livros.component';
import { VoluntariosComponent } from './epics/main/feira/voluntarios/voluntarios.component';
import { PalestrasComponent } from './epics/main/feira/palestras/palestras.component';
import { ClubeDoLivroComponent } from './epics/main/feira/clube-do-livro/clube-do-livro.component';
import { EditoraComponent } from './epics/main/feira/editora/editora.component';
import { JovemAudithoriumComponent } from './epics/jovem/jovem-audithorium/jovem-audithorium.component';
import { CaravanSpaceComponent } from './epics/main/caravan-space/caravan-space.component';
import { GamesComponent } from './epics/jovem/pages/ilha1/jogos-tematicos/games/games.component';
import { MagneticPassDistanceComponent } from './epics/main/magnetic-pass-distance/magnetic-pass-distance.component';
import { JovemListComponent } from './epics/jovem/jovem-list/jovem-list.component';
import { MissionAddComponent } from './admin/mission/mission-add/mission-add.component';
import { MissionListComponent } from './admin/mission/mission-list/mission-list.component';
import { MissionEditComponent } from './admin/mission/mission-edit/mission-edit.component';
import { CardRankingComponent } from './components/profile-edit/card-ranking/card-ranking.component';
import { InfanciaInicioComponent } from './epics/infancia/infancia-inicio/infancia-inicio.component';
import { InfanciaCasaOracaoComponent } from './epics/infancia/pages/infancia-casa-oracao/infancia-casa-oracao.component';

import { InfanciaCantinhoHistoriaComponent } from './epics/infancia/pages/infancia-cantinho-historia/infancia-cantinho-historia.component';


import { InfanciaCasaNvl2Component } from './epics/infancia/pages/infancia-casa-nvl2/infancia-casa-nvl2.component';
import { InfanciaRodaAlegriaComponent } from './epics/infancia/pages/infancia-roda-alegria/infancia-roda-alegria.component';
import { InfanciaBomSamaritanoComponent } from './epics/infancia/pages/infancia-bom-samaritano/infancia-bom-samaritano.component';
import { InfanciaCircoConcafrinhasComponent } from './epics/infancia/pages/infancia-circo-concafrinhas/infancia-circo-concafrinhas.component';







import { FlipsnackComponent } from './epics/infancia/embed-utils/flipsnack/flipsnack.component';

import { PadletComponent } from './epics/infancia/embed-utils/padlet/padlet.component';
import { InfanciaParquinhoComponent } from './epics/infancia/pages/infancia-parquinho/infancia-parquinho.component';
import { InfanciaAtividadesComponent } from './epics/infancia/pages/infancia-atividades/infancia-atividades.component';
import { InfanciaCasaNvl1Component } from './epics/infancia/pages/infancia-casa-nvl1/infancia-casa-nvl1.component';
import { JogosDigitaisComponent } from './epics/infancia/pages/infancia-parquinho/jogos-digitais/jogos-digitais.component';
import { BrincadeirasComponent } from './epics/infancia/pages/infancia-parquinho/brincadeiras/brincadeiras.component';
import { LaborterapiasComponent } from './epics/infancia/pages/infancia-atividades/laborterapias/laborterapias.component';
import { DesenhosImprimirComponent } from './epics/infancia/pages/infancia-atividades/desenhos-imprimir/desenhos-imprimir.component';
import { BercarioComponent } from './epics/infancia/pages/infancia-casa-nvl1/bercario/bercario.component';
import { MaternalComponent } from './epics/infancia/pages/infancia-casa-nvl1/maternal/maternal.component';
import { JardimComponent } from './epics/infancia/pages/infancia-casa-nvl1/jardim/jardim.component';
import { ShareMessageComponent } from './epics/main/share-message/share-message.component';
import { JovemClassroomComponent } from './epics/jovem/jovem-classroom/jovem-classroom.component';
import { BookClubComponent } from './epics/main/book-club/book-club.component';
import { FraternalSupportComponent } from './epics/main/fraternal-support/fraternal-support.component';
import { NdcActivitiesComponent } from './epics/main/feira/ndc-activities/ndc-activities.component';
import { AudithoriumSpecialComponent } from './epics/main/audithorium-special/audithorium-special.component';
import { XpsListComponent } from './admin/xps/xps-list/xps-list.component';
import { XpsAddComponent } from './admin/xps/xps-add/xps-add.component';
import { XpsEditComponent } from './admin/xps/xps-edit/xps-edit.component';
import { SubscriptionListComponent } from './admin/subscription/subscription-list/subscription-list.component';
import { UserTrailsComponent } from './epics/main/user-trails/user-trails.component';
import { AllContentComponent } from './epics/main/all-content/all-content.component';
import { SubscriptionEditComponent } from './admin/subscription/subscription-edit/subscription-edit.component';
import { AudioPlayerComponent } from './components/channels/audio-player/audio-player.component';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';
import { HistoryMissionsComponent } from './components/profile-edit/history-missions/history-missions.component';
import { EfasComponent } from './epics/main/efas/efas.component';
import { ResetPassComponent } from './components/login/reset-pass/reset-pass.component';
import { DiferenceComponent } from './epics/main/diference/diference.component';
import { JovemRightSidebarComponent } from './epics/jovem/jovem-right-sidebar/jovem-right-sidebar.component';
import { UserWelcomeComponent } from './epics/main/user-welcome/user-welcome.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule, UserTrackingService } from '@angular/fire/analytics';
import { environment } from 'src/environments/environment';

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
  { badge: 'TERRA', icon: 'assets/concafras2021/concafronas/badges/terra.svg', range: { min: 0, max: 199 } },
  { badge: 'MARTE', icon: 'assets/concafras2021/concafronas/badges/marte.svg', range: { min: 200, max: 449 } },
  { badge: 'VENUS', icon: 'assets/concafras2021/concafronas/badges/venus.svg', range: { min: 450, max: 799 } },
  { badge: 'JUPITER', icon: 'assets/concafras2021/concafronas/badges/jupiter.svg', range: { min: 800, max: 1049 } },
  { badge: 'SOL', icon: 'assets/concafras2021/concafronas/badges/sol.svg', range: { min: 1050, max: 2000 } },
];

const config: SocketIoConfig = { url: 'http://localhost:3800', options: {} };

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
    MissionAddComponent,
    MissionListComponent,
    MissionEditComponent,
    DashboardComponent,
    DeleteConfirmComponent,
    JovemHomeComponent,
    JovemDashboardComponent,
    Ilha1Component,
    InfanciaHomeComponent,
    InfanciaDashboardComponent,
    ContentTimeDirective,
    // InfanciaLevelComponent,
    InfanciaAudithoriumComponent,
    InfanciaGeralComponent,
    SelectConferenceComponent,
    ConfirmComponent,
    ChartComponent,
    ScheduleComponent,
    //YoutubeComponent,
    //FlvplayerComponent,
    VideojsComponent,
    ZoomusComponent,
    SafePipe,
    TermosComponent,
    AboutComponent,
    Ilha1DialogoComponent,
    //ChatComponent,
    JogosTematicosComponent,
    Ilha2Component,
    Ilha3Component,
    Ilha4Component,
    Ilha5Component,
    Ilha3DialogoComponent,
    Ilha4DialogoComponent,
    Ilha5DialogoComponent,
    Ilha2DialogoComponent,
    MuralArtisticoComponent,
    AlegriaCristaMusicasComponent,
    LancamentosComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    TendaComponent,
    EventCleanComponent,
    NdcComponent,
    CecxComponent,
    CfasComponent,
    LivrosComponent,
    VoluntariosComponent,
    PalestrasComponent,
    ClubeDoLivroComponent,
    EditoraComponent,
    JovemAudithoriumComponent,
    CaravanSpaceComponent,
    GamesComponent,
    MagneticPassDistanceComponent,
    JovemListComponent,
    CardRankingComponent,
    InfanciaInicioComponent,
    InfanciaCasaOracaoComponent,
    InfanciaParquinhoComponent,
    InfanciaCantinhoHistoriaComponent,
    InfanciaAtividadesComponent,
    InfanciaCasaNvl1Component,
    InfanciaCasaNvl2Component,
    InfanciaRodaAlegriaComponent,
    InfanciaBomSamaritanoComponent,
    InfanciaCircoConcafrinhasComponent,
    JogosDigitaisComponent,
    BrincadeirasComponent,
    LaborterapiasComponent,
    DesenhosImprimirComponent,
    BercarioComponent,
    MaternalComponent,
    JardimComponent,
    PadletComponent,
    FlipsnackComponent,
    ShareMessageComponent,
    JovemClassroomComponent,
    BookClubComponent,
    FraternalSupportComponent,
    NdcActivitiesComponent,
    AudithoriumSpecialComponent,
    XpsListComponent,
    XpsAddComponent,
    XpsEditComponent,
    SubscriptionListComponent,
    SubscriptionEditComponent,
    UserTrailsComponent,
    AllContentComponent,
    AudioPlayerComponent,
    ConfirmPasswordComponent,
    HistoryMissionsComponent,
    EfasComponent,
    ResetPassComponent,
    DiferenceComponent,
    JovemRightSidebarComponent,
    UserWelcomeComponent,
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
    ChartsModule,
    FontAwesomeModule,
    AngularSvgIconModule.forRoot(),
    //SocketIoModule.forRoot(config),
    TooltipModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule
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
      UserGuard,
      UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }