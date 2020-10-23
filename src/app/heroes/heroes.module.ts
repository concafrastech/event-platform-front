// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

// Rutas
import { HeroesRoutingModule } from './heroes.routing';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { HeroesComponent } from './components/heroes/heroes.component';


// Services
import {UserService} from '../services/user.service';
import {UserGuard} from '../services/user.guard';
import { HeroMainComponent } from './components/main/hero-main.component';

@NgModule({
  declarations: [
    HeroMainComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    HeroesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeroesRoutingModule,
    MomentModule
  ],
  exports: [
    HeroMainComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    HeroesComponent
  ],
  providers: [
    UserService,
    UserGuard
  ]
})
export class HeroesModule { }
