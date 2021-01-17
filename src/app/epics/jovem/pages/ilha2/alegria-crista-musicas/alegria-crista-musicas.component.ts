import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alegria-crista-musicas',
  templateUrl: './alegria-crista-musicas.component.html',
  styleUrls: ['./alegria-crista-musicas.component.css']
})
export class AlegriaCristaMusicasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

playVideo(vid_source) {
  let vid = document.getElementById("myVideo");
 // vid.src == vid_source;
 // vid.load();
} 

}
