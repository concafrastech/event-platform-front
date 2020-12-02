import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './epics/main/home/home.component';
import { ContentComponent } from './admin/content/content.component';
import { UsersComponent } from './social-network/users/users.component';
import { TimelineComponent } from './social-network/timeline/timeline.component';
import { ProfileComponent } from './social-network/profile/profile.component';
import { FollowingComponent } from './social-network/following/following.component';
import { FollowedComponent } from './social-network/followed/followed.component';

import { UserGuard } from './services/user.guard';
import { HubComponent } from './epics/main/hub/hub.component';
import { AudithoriumComponent } from './epics/main/audithorium/audithorium.component';
import { SelectJourneyComponent } from './components/select-journey/select-journey.component';
import { EventComponent } from './epics/main/event/event.component';
import { ZoomusComponent } from './components/channels/zoomus/zoomus.component';
import { ConferenceEditComponent } from './admin/conference/conference-edit/conference-edit.component';
import { ConferenceListComponent } from './admin/conference/conference-list/conference-list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EpicEditComponent } from './admin/epic/epic-edit/epic-edit.component';
import { EpicListComponent } from './admin/epic/epic-list/epic-list.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { UserEditComponent } from './admin/user/user-edit/user-edit.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { SocialDashboardComponent } from './social-network/social-dashboard/social-dashboard.component';
import { SocialHomeComponent } from './social-network/social-home/social-home.component';
import { ConferenceAddComponent } from './admin/conference/conference-add/conference-add.component';
import { EpicAddComponent } from './admin/epic/epic-add/epic-add.component';
import { LectureAddComponent } from './admin/lecture/lecture-add/lecture-add.component';
import { LectureEditComponent } from './admin/lecture/lecture-edit/lecture-edit.component';
import { LectureListComponent } from './admin/lecture/lecture-list/lecture-list.component';
import { TrailAddComponent } from './admin/trail/trail-add/trail-add.component';
import { TrailEditComponent } from './admin/trail/trail-edit/trail-edit.component';
import { TrailListComponent } from './admin/trail/trail-list/trail-list.component';
import { ClassroomAddComponent } from './admin/classroom/classroom-add/classroom-add.component';
import { ClassroomEditComponent } from './admin/classroom/classroom-edit/classroom-edit.component';
import { ClassroomListComponent } from './admin/classroom/classroom-list/classroom-list.component';
import { DocumentEditComponent } from './admin/document/document-edit/document-edit.component';
import { DocumentListComponent } from './admin/document/document-list/document-list.component';
import { JovemDashboardComponent } from './epics/jovem/jovem-dashboard/jovem-dashboard.component';
import { JovemHomeComponent } from './epics/jovem/jovem-home/jovem-home.component';
import { InfanciaDashboardComponent } from './epics/infancia/infancia-dashboard/infancia-dashboard.component';
import { InfanciaHomeComponent } from './epics/infancia/infancia-home/infancia-home.component';
import { StageEditComponent } from './admin/stage/stage-edit/stage-edit.component';
import { StageListComponent } from './admin/stage/stage-list/stage-list.component';
import { StageAddComponent } from './admin/stage/stage-add/stage-add.component';
import { ActivityAddComponent } from './admin/activity/activity-add/activity-add.component';
import { ActivityEditComponent } from './admin/activity/activity-edit/activity-edit.component';
import { ActivityListComponent } from './admin/activity/activity-list/activity-list.component';
import { InfanciaLevelComponent } from './epics/infancia/infancia-level/infancia-level.component';
import { InfanciaAudithoriumComponent } from './epics/infancia/infancia-audithorium/infancia-audithorium.component';
import { InfanciaGeralComponent } from './epics/infancia/infancia-geral/infancia-geral.component';
import { SelectConferenceComponent } from './components/select-conference/select-conference.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'testezoom', component: ZoomusComponent},
    {path: 'select-journey', component: SelectJourneyComponent, canActivate:[UserGuard]},
    {path: 'select-conference', component: SelectConferenceComponent, canActivate:[UserGuard]},
    {
        path: 'admin',
        component: DashboardComponent,
        canActivate:[UserGuard],
        children: [
            {path: 'conference/add', component: ConferenceAddComponent},
            {path: 'conference/edit/:id', component: ConferenceEditComponent},
            {path: 'conference/list', component: ConferenceListComponent},
            {path: 'conference/list/:page', component: ConferenceListComponent},
            {path: 'epic/add', component: EpicAddComponent},
            {path: 'epic/edit/:id', component: EpicEditComponent},
            {path: 'epic/list', component: EpicListComponent},
            {path: 'epic/list/:page', component: EpicListComponent},
            {path: 'lecture/add', component: LectureAddComponent},
            {path: 'lecture/edit/:id', component: LectureEditComponent},
            {path: 'lecture/list', component: LectureListComponent},
            {path: 'lecture/list/:page', component: LectureListComponent},
            {path: 'trail/add', component: TrailAddComponent},
            {path: 'trail/edit/:id', component: TrailEditComponent},
            {path: 'trail/list', component: TrailListComponent},
            {path: 'trail/list:page', component: TrailListComponent},
            {path: 'classroom/add', component: ClassroomAddComponent},
            {path: 'classroom/edit/:id', component: ClassroomEditComponent},
            {path: 'classroom/list', component: ClassroomListComponent},
            {path: 'classroom/list/:page', component: ClassroomListComponent},
            {path: 'document/edit/:id', component: DocumentEditComponent},
            {path: 'document/list', component: DocumentListComponent},
            {path: 'document/list/:page', component: DocumentListComponent},
            {path: 'stage/add', component: StageAddComponent},
            {path: 'stage/edit/:id', component: StageEditComponent},
            {path: 'stage/list', component: StageListComponent},
            {path: 'stage/list/:page', component: StageListComponent},
            {path: 'activity/add', component: ActivityAddComponent},
            {path: 'activity/edit/:id', component: ActivityEditComponent},
            {path: 'activity/list', component: ActivityListComponent},
            {path: 'activity/list/:page', component: ActivityListComponent},
            {path: 'user/edit/:id', component: UserEditComponent},
            {path: 'user/list', component: UserListComponent},
            {path: 'content', component: ContentComponent},
        ],
    },
    {
        path: 'social',
        component: SocialDashboardComponent,
        canActivate:[UserGuard],
        children: [
            {path: '',  redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: SocialHomeComponent, canActivate:[UserGuard]},
            {path: 'pessoas', component: UsersComponent, canActivate:[UserGuard]},
            {path: 'pessoas/:page', component: UsersComponent, canActivate:[UserGuard]},
            {path: 'timeline', component: TimelineComponent, canActivate:[UserGuard]},
            {path: 'perfil/:id', component: ProfileComponent, canActivate:[UserGuard]},
            {path: 'seguindo/:id/:page', component: FollowingComponent, canActivate:[UserGuard]},
            {path: 'seguidores/:id/:page', component: FollowedComponent, canActivate:[UserGuard]},
        ],
    },
    {
        path: 'jovem',
        component: JovemDashboardComponent,
        canActivate:[UserGuard],
        children: [
            {path: '',  redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: JovemHomeComponent, canActivate:[UserGuard]}
        ],
    },
    {
        path: 'concafrinhas',
        component: InfanciaDashboardComponent,
        canActivate:[UserGuard],
        children: [
            {path: '',  redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: InfanciaHomeComponent, canActivate:[UserGuard]},
            {path: 'nivel', component: InfanciaLevelComponent, canActivate:[UserGuard]},
            {path: 'nivel/:level', component: InfanciaLevelComponent, canActivate:[UserGuard]},
            {path: 'geral', component: InfanciaGeralComponent, canActivate:[UserGuard]},
            {path: 'audithorium', component: InfanciaAudithoriumComponent, canActivate:[UserGuard]},
        ],
    },
    {
        path: '',
        component: EventComponent,
        children: [
            {path: '',  redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent, canActivate:[UserGuard]},
            {path: 'hub', component: HubComponent, canActivate:[UserGuard]},
            {path: 'audithorium', component: AudithoriumComponent, canActivate:[UserGuard]},
            {path: 'meus-dados', component: ProfileEditComponent, canActivate:[UserGuard]},
            
        ],
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
