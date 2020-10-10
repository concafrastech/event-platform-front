import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { YoutubeComponent } from './pages/channels/youtube/youtube.component';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { GamificationModule } from 'angular-gamification';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AudithoriumComponent } from './pages/audithorium/audithorium.component';

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
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    YoutubeComponent,
    WelcomeComponent,
    AudithoriumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YoutubePlayerModule,
    GamificationModule.forRoot(GamificationConfig)
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
