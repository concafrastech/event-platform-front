import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// Declara a lib do videojs como externa ao angular
declare let videojs: any;

@Component({
  selector: 'app-videojs',
  templateUrl: './videojs.component.html',
  styleUrls: ['./videojs.component.css']
})
export class VideojsComponent implements AfterViewInit {

  // Titulo do component
  title = 'Player com Video.JS';
  // Instancia do video.js.
  vidObj: any;
  // Poster para ser usado no video.js
  poster = '//d2zihajmogu5jn.cloudfront.net/elephantsdream/poster.png';
  // URL do video a ser reproduzido.
  video = '//d2zihajmogu5jn.cloudfront.net/elephantsdream/ed_hd.mp4';
  // Acessa o elemento video do html5 via viewchild.
  @ViewChild('myvid') vid: ElementRef;

  ngAfterViewInit() {
    const options = {
      controls: true,
      autoplay: false,
      preload: 'auto',
      techOrder: ['html5']
    };

    const options2 = {
      controls: true,
      autoplay: false,
      preload: 'auto',
      techOrder: ['youtube'],
      sources: [ 
        {
          type: "video/youtube", 
          src: "https://www.youtube.com/watch?v=xjS6SftYQaQ"
        }
      ], 
      youtube: { 
        iv_load_policy: 1 
      }
    };


    this.vidObj = new videojs(this.vid.nativeElement, options2, function onPlayerReady() {
      videojs.log('Your player is ready!');
    });
  }

}
