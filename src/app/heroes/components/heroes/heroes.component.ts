import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../services/heroes.service';

import { GamificationService } from 'angular-gamification';

import { Hero } from '../../models/hero';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private heroesService: HeroesService,
    public gamification: GamificationService
  ) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroesService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.gamification.achieveMission('add');
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroesService.deleteHero(hero).subscribe(() => {
      this.gamification.achieveMission('delete');
    });
  }

}
