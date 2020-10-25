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
import { HeroesService } from './services/heroes.service';
import { MessageService } from './services/message.service';
import { GamificationModule } from 'angular-gamification';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

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
const GamificationConfig = {
  levels: levels
};

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
    MomentModule,
    GamificationModule.forRoot(GamificationConfig),

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  exports: [
    HeroMainComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    HeroesComponent
  ],
  providers: [
    HeroesService,
    MessageService,
    UserService,
    UserGuard
  ]
})
export class HeroesModule { }
