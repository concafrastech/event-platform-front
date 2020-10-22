import { Component, OnInit } from '@angular/core';
import 'flv.js';
import FlvJs from 'flv.js';

@Component({
  selector: 'app-flvplayer',
  templateUrl: './flvplayer.component.html',
  styleUrls: ['./flvplayer.component.css']
})
export class FlvplayerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (FlvJs.isSupported()) {
      const videoElement =    <HTMLAudioElement>document.getElementById('videoElement');
      const flvPlayer = FlvJs.createPlayer({
        type: 'flv',
        url: 'http://127.0.0.1:1337/'
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
    }
  }

}
