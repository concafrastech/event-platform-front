import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsersComponent } from './social-network/users/users.component';
import { TimelineComponent } from './social-network/timeline/timeline.component';
import { ProfileComponent } from './social-network/profile/profile.component';
import { FollowingComponent } from './social-network/following/following.component';
import { FollowedComponent } from './social-network/followed/followed.component';

import {UserGuard} from './services/user.guard';
import { HubComponent } from './components/hub/hub.component';
import { AudithoriumComponent } from './components/audithorium/audithorium.component';
import { SelectJourneyComponent } from './components/select-journey/select-journey.component';
import { EventComponent } from './components/event/event.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {
        path: '',
        component: EventComponent,
        children: [
            {path: '',  redirectTo: 'home', pathMatch: 'full'},
            {path: 'home', component: HomeComponent, canActivate:[UserGuard]},
            {path: 'hub', component: HubComponent, canActivate:[UserGuard]},
            {path: 'audithorium', component: AudithoriumComponent, canActivate:[UserGuard]},
            {path: 'select-journey', component: SelectJourneyComponent, canActivate:[UserGuard]},
            {path: 'meus-dados', component: UserEditComponent, canActivate:[UserGuard]},
            {path: 'gente', component: UsersComponent, canActivate:[UserGuard]},
            {path: 'gente/:page', component: UsersComponent, canActivate:[UserGuard]},
            {path: 'timeline', component: TimelineComponent, canActivate:[UserGuard]},
            {path: 'perfil/:id', component: ProfileComponent, canActivate:[UserGuard]},
            {path: 'seguindo/:id/:page', component: FollowingComponent, canActivate:[UserGuard]},
            {path: 'seguidores/:id/:page', component: FollowedComponent, canActivate:[UserGuard]},
            {path: 'admin', component: AdminComponent, canActivate:[UserGuard]},
        ],
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
