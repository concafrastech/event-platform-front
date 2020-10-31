import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

declare let videojs: any;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, AfterViewInit, OnDestroy {

  private videoUrl = 'https://youtu.be/iokMf5Ehx2c';
  private originData: string = window.location.origin;
  public title: string;
  public closeBtnName: string;

   // Instancia do video.js.
   videoJSplayer: any;
   // Acessa o elemento video do html5 via viewchild.
   @ViewChild('welcomevideo') vid: ElementRef;
 
  constructor(public bsModalRef: BsModalRef) {}
 
  ngOnInit() {
    
  }

  ngAfterViewInit() {
    const options = {
      controls: true,
      autoplay: true,
      preload: 'auto',
      techOrder: ['html5','youtube'],
      sources: [ 
        {
          type: "video/youtube", 
          src: this.videoUrl,
          youtube: {
            ytControls: 0,
            iv_load_policy: 3,
            color: 'red',
            modestbranding: 1,
            showinfo: 0, 
            ecver: 2,
            rel: 0,
            fs: 1,
            customVars: {
              wmode: 'transparent',
              enablejsapi: 1,
              origin: this.originData
            }
          }
        }
      ], 
    };


    this.videoJSplayer = new videojs(this.vid.nativeElement, options, function onPlayerReady() {
      videojs.log('Your player is ready!');
    });
  }

  ngOnDestroy() {
    this.videoJSplayer.dispose();
  }

}
