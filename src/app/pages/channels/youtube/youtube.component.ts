import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  player: YT.Player;
  id: string = 'qDuKsiwS5xw';

  playerVars: YT.PlayerVars = {
    controls: 0,
    autoplay: 1,
    showinfo: YT.ShowInfo.Hide,
    modestbranding: YT.ModestBranding.Modest,
  }

  sizes: any = {
    width: 800,
    height: 600
  }

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }
  onStateChange(event) {
    console.log('player state', event.data);
  }

}
