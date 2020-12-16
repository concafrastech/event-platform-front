import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Content } from 'src/app/models/content';

// Declara a lib do videojs como externa ao angular
declare let videojs: any;

@Component({
  selector: 'app-videojs',
  templateUrl: './videojs.component.html',
  styleUrls: ['./videojs.component.css']
})
export class VideojsComponent implements AfterViewInit {

  vidObj: any;
  @Input() public vContent: Content;
  @ViewChild('myvid') vid: ElementRef;
  option: any;

  //Adicionado on init para criar options: Opção Replay?
  ngOnInit(): void {
    this.option = {
      controls: this.vContent.controls,
      autoplay: this.vContent.autoplay,
      preload: 'auto',
      techOrder: ['youtube'],
      sources: [ 
        {
          type: "video/youtube", 
          src: this.vContent.url,
        }
      ], 
      youtube: { 
        iv_load_policy: 1 
      }
    }
  }

  ngAfterViewInit() {
    /*const options = {
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
          src: this.vContent.url,
        }
      ], 
      youtube: { 
        iv_load_policy: 1 
      }
    };*/
    
    this.vidObj = new videojs(this.vid.nativeElement, this.option, function onPlayerReady() {
      videojs.log('Your player is ready!');
    });
  }

}
