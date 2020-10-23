import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { HeroesComponent }      from './components/heroes/heroes.component';
import { HeroDetailComponent }  from './components/hero-detail/hero-detail.component';
import { HeroMainComponent } from './components/main/hero-main.component';
import { UserGuard } from '../services/user.guard';

const heroRoutes: Routes = [
  {
      path: 'heroes',
      component: HeroMainComponent,
      children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent, canActivate:[UserGuard] },
          { path: 'detail/:id', component: HeroDetailComponent, canActivate:[UserGuard] },
          { path: 'list', component: HeroesComponent, canActivate:[UserGuard] }
      ]
  },
];

@NgModule({
imports: [
  RouterModule.forChild(heroRoutes)
],
exports: [
  RouterModule
],
providers: []
})
export class HeroesRoutingModule { }