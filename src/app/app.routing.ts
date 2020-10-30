import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

import {UserGuard} from './services/user.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HubComponent } from './components/hub/hub.component';

const appRoutes: Routes = [
    {path: '',  redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'hub', component: HubComponent, canActivate:[UserGuard]},
    {path: 'meus-dados', component: UserEditComponent, canActivate:[UserGuard]},
    {path: 'gente', component: UsersComponent, canActivate:[UserGuard]},
    {path: 'gente/:page', component: UsersComponent, canActivate:[UserGuard]},
    {path: 'timeline', component: TimelineComponent, canActivate:[UserGuard]},
    {path: 'perfil/:id', component: ProfileComponent, canActivate:[UserGuard]},
    {path: 'seguindo/:id/:page', component: FollowingComponent, canActivate:[UserGuard]},
    {path: 'seguidores/:id/:page', component: FollowedComponent, canActivate:[UserGuard]},
    {path: '**', component: HomeComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
