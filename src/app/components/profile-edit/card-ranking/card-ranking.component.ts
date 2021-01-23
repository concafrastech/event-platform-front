import { Component, OnInit } from '@angular/core';
import { 
  faUserCircle
} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-card-ranking',
  templateUrl: './card-ranking.component.html',
  styleUrls: ['./card-ranking.component.css']
})
export class CardRankingComponent implements OnInit {

  public faUserCircle = faUserCircle;

  public rankingList: any[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.loadRanking();
  }

  loadRanking(){
    this.rankingList = [];

    for(let i = 0; i < 6; i++){
      this.rankingList.push('substituir por usuário no ranking')
    }
  }
}
