import { Component, Input, OnInit } from '@angular/core';
import { Document } from 'src/app/models/document';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {

  @Input() public document: Document = null;

  constructor() { }

  ngOnInit(): void {
  }

}
