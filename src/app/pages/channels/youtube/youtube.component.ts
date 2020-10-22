import { AfterViewInit, Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  player: YT.Player;
  id: string = 'qDuKsiwS5xw';

  playerVars: YT.PlayerVars = {
    rel: 0,
    controls: 0,
    autoplay: 1,
    showinfo: YT.ShowInfo.Hide,
    modestbranding: YT.ModestBranding.Modest,
  }

  sizes: any = {
    width: 1080,
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
