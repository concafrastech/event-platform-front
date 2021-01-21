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
  
  constructor() { }

  ngOnInit(): void {
  }

}
