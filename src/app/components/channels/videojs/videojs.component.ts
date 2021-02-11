import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  Renderer2,
  ViewEncapsulation,
} from "@angular/core";
import { Content } from "src/app/models/content";
import { YoutubeLiveService } from "src/app/services/youtubelive.service";

// Declara a lib do videojs como externa ao angular
declare let videojs: any;

@Component({
  selector: "app-videojs",
  templateUrl: "./videojs.component.html",
  styleUrls: ["./videojs.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class VideojsComponent implements OnInit {
  vidObj: any;
  @Input() public vContent: Content = null;
  @ViewChild("myvid") vid: ElementRef;
  @ViewChild("vidContainer") container: ElementRef;
  option: any;
  isLoading: boolean;

  constructor(
    private renderer: Renderer2,
    private _youtubeLiveService: YoutubeLiveService
  ) {
    this.isLoading = true;
  }

  //Adicionado on init para criar options: Opção Replay?
  ngOnInit(): void {}

  ngAfterViewInit() {
    //Inicializa video player
    this.setupVideoOptions();
    this.newVideoPlayer();
    this.isLoading = false;
  }

  //Prepara options do video
  setupVideoOptions() {
    this.option = {
      controls: this.vContent.controls,
      autoplay: this.vContent.autoplay,
      preload: "auto",
      techOrder: ["youtube"],
      sources: [
        {
          type: "video/youtube",
          src: this.vContent.url,
        },
      ],
      youtube: {
        iv_load_policy: 1,
      },
    };
  }

  //Ao trocar o conteúdo é necessário destruir a tag e recria-la para atualizar o video
  ngOnChanges(): void {
    if (!this.isLoading) {
      this.setupVideoOptions();
      this.disposeVideo();
      this.newVideoPlayer();
    }
  }

  //Cria um novo video player
  newVideoPlayer() {
    //Cria tag video
    const tagVideo = this.renderer.createElement("video");
    this.renderer.setProperty(tagVideo, "id", `my-video-${this.vContent._id}`);
    this.renderer.addClass(tagVideo, "video-js");
    this.renderer.addClass(tagVideo, "vjs-big-play-centered");
    this.renderer.addClass(tagVideo, "mini-play");
    this.renderer.setStyle(tagVideo, "margin", "auto");

    //Adiciona tag no html
    this.renderer.appendChild(this.container.nativeElement, tagVideo);

    //Cria referencia para a tag video criada
    this.vid = new ElementRef(tagVideo);

    //Caso seja necessário tag source dentro da tag video
    // const tagSource = this.renderer.createElement("source");
    // this.renderer.setProperty(tagSource, "src", this.vContent.url);
    // this.renderer.setProperty(tagSource, "type", "video/youtube");
    // this.renderer.appendChild(this.vid.nativeElement, tagSource);

    //Cria novo player
    this.vidObj = new videojs(
      this.vid.nativeElement,
      this.option,
      function onPlayerReady() {
        videojs.log("Your player is ready!");
      }
    );

    var split = this.vContent.url.split("https://www.youtube.com/watch?v=");
    if(split.length == 2) {
      this._youtubeLiveService.youtubelive.next(split[1]);
    } else {
      var url = this.vContent.url.split('/');
      var code = url[url.length - 1];
      this._youtubeLiveService.youtubelive.next(code);
    }
  }

  //função para destruir o video
  disposeVideo() {
    if (this.vidObj) {
      this.vidObj.dispose();
      this.vid = null;
      this.vidObj = null;
    }
  }

  //Ao destruir o componente elimina o video também
  ngOnDestroy(): void {
    this.disposeVideo();
  }
}
