import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsersComponent } from './social-network/users/users.component';
import { TimelineComponent } from './social-network/timeline/timeline.component';
import { ProfileComponent } from './social-network/profile/profile.component';
import { FollowingComponent } from './social-network/following/following.component';
import { FollowedComponent } from './social-network/followed/followed.component';

import { UserGuard } from './services/user.guard';
import { HubComponent } from './components/hub/hub.component';
import { AudithoriumComponent } from './components/audithorium/audithorium.component';
import { SelectJourneyComponent } from './components/select-journey/select-journey.component';
import { EventComponent } from './components/event/event.component';
import { ZoomusComponent } from './components/channels/zoomus/zoomus.component';
import { ConferenceEditComponent } from './admin/conference/conference-edit/conference-edit.component';
import { ConferenceListComponent } from './admin/conference/conference-list/conference-list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EpicEditComponent } from './admin/epic/epic-edit/epic-edit.component';
import { EpicListComponent } from './admin/epic/epic-list/epic-list.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { UserEditComponent } from './admin/user/user-edit/user-edit.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'testezoom', component: ZoomusComponent},
    {
        path: 'admin',
        component: DashboardComponent,
        children: [
            {path: 'conference/edit/:id', component: ConferenceEditComponent},
            {path: 'conference/list', component: ConferenceListComponent},
            {path: 'epic/edit/:id', component: EpicEditComponent},
            {path: 'epic/list', component: EpicListComponent},
            {path: 'user/edit/:id', component: UserEditComponent},
            {path: 'user/list', component: UserListComponent},
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
            {path: 'select-journey', component: SelectJourneyComponent, canActivate:[UserGuard]},
            {path: 'meus-dados', component: ProfileEditComponent, canActivate:[UserGuard]},
            {path: 'gente', component: UsersComponent, canActivate:[UserGuard]},
            {path: 'gente/:page', component: UsersComponent, canActivate:[UserGuard]},
            {path: 'timeline', component: TimelineComponent, canActivate:[UserGuard]},
            {path: 'perfil/:id', component: ProfileComponent, canActivate:[UserGuard]},
            {path: 'seguindo/:id/:page', component: FollowingComponent, canActivate:[UserGuard]},
            {path: 'seguidores/:id/:page', component: FollowedComponent, canActivate:[UserGuard]},
            {path: 'conteudo', component: AdminComponent, canActivate:[UserGuard]},
        ],
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
