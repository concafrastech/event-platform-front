import { ConfirmPasswordComponent } from './../../../components/confirm-password/confirm-password.component';
import { concatMap, map } from "rxjs/operators";
import { DocumentService } from "src/app/services/document.service";
import { ContentService } from "src/app/services/content.service";
import { LectureService } from "src/app/services/lecture.service";
import { Lecture } from "src/app/models/lecture";
import { ShareMessageComponent } from "./../share-message/share-message.component";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { UserService } from "src/app/services/user.service";
import { ShareMessage } from "src/app/models/share-message";
import { Instagram } from "src/app/models/instagram";
import { ShareMessageService } from "src/app/services/share-message.service";
import { concat, Subscription } from "rxjs";
import { SocialFeedService } from "src/app/services/social-feed.service";
import { Content } from "src/app/models/content";
import { Observable } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { UserGamificationService } from 'src/app/services/user-gamification.service';

@Component({
  selector: "app-caravan-space",
  templateUrl: "./caravan-space.component.html",
  styleUrls: ["./caravan-space.component.css"],
  providers: [
    UserService,
    ShareMessageService,
    SocialFeedService,
    BsModalService,
    LectureService,
    ContentService,
    DocumentService,
  ],
})
export class CaravanSpaceComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public modalSub: Subscription;
  public feeds: Instagram[] = [];

  //Share messages
  public messages: ShareMessage[] = [];
  public actualCarouselShareMessage: number = 0;
  public maxCarouselShareMessage: number = 0;
  public groupsCarouselShareMessage: number[] = [];
  public groupMessagesShareMessage: ShareMessage[] = [];

  //Sing with us
  public currentSongVideo: Content;
  public songs: Lecture[] = [];
  public actualCarouselSingWithUs: number = 0;
  public maxCarouselSingWithUs: number = 0;
  public groupsCarouselSingWithUs: number[] = [];
  public groupSongsSingWithUs: Lecture[] = [];
  public isVideoLoading: boolean;

  //Musics
  public musics: Lecture[] = [];
  public actualCarouselMusic: number = 0;
  public maxCarouselMusic: number = 0;
  public groupsCarouselMusic: number[] = [];
  public groupMusic: Lecture[] = [];

  //Workshops
  public workshops: Lecture[] = [];
  public actualCarouselWorkshop: number = 0;
  public maxCarouselWorkshop: number = 0;
  public groupsCarouselWorkshop: number[] = [];
  public groupWorkshop: Lecture[] = [];

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _modalService: BsModalService,
    private _shareMessageService: ShareMessageService,
    private _lectureService: LectureService,
    private _contentService: ContentService,
    private _documentService: DocumentService,
    private _socialFeedService: SocialFeedService,
    private _spinner: NgxSpinnerService,
    private _userGamificationService: UserGamificationService
  ) {}

  ngOnInit(): void {
    this.modalSub = this._modalService.onHidden.subscribe((resposta) => {
      this.loadCarouselShareMessages();
    });

    this._spinner.show();
    this.loadCarouselShareMessages();
    this.loadCarouselSingWithUs();
    this.loadCarouselMusic();
    this.loadCarouselWorkshop();
    this.loadSocialFeed();
  }

  loadSocialFeed() {
    this._socialFeedService.getSocialFeeds().subscribe((resposta) => {
      this.feeds = resposta;
    });
  }

  // *****Start share message *****
  loadCarouselShareMessages() {
    this._shareMessageService
      .getFullShareMessages(null)
      .subscribe((resposta) => {
        this.messages = resposta.shareMessages;
        this.actualCarouselShareMessage = 0;
        this.maxCarouselShareMessage = 1;

        let vNumbers: string[] = (this.messages.length / 4)
          .toString()
          .split(".");
        this.maxCarouselShareMessage = +vNumbers[0];
        let parteFlutuante: number = +vNumbers[1];

        if (parteFlutuante > 0) {
          this.maxCarouselShareMessage += 1;
        }

        this.groupsCarouselShareMessage = [];
        for (let i = 1; i <= this.maxCarouselShareMessage; i++) {
          this.groupsCarouselShareMessage.push(i);
        }

        this.createShareMessageGroups();
      });
  }

  createShareMessageGroups() {
    this.groupMessagesShareMessage = [];
    let indexStart = this.actualCarouselShareMessage * 4;
    let indexEnd = (this.actualCarouselShareMessage + 1) * 4;
    if (indexEnd > this.messages.length) {
      indexEnd = this.messages.length;
    }

    for (let i = indexStart; i < indexEnd; i++) {
      this.groupMessagesShareMessage.push(this.messages[i]);
    }
  }

  previousCarouselShareMessage() {
    if (this.actualCarouselShareMessage > 0) {
      this.actualCarouselShareMessage -= 1;
    } else {
      this.actualCarouselShareMessage = this.maxCarouselShareMessage - 1;
    }
    this.createShareMessageGroups();
  }

  nextCarouselShareMessage() {
    if (this.actualCarouselShareMessage == this.maxCarouselShareMessage - 1) {
      this.actualCarouselShareMessage = 0;
    } else {
      this.actualCarouselShareMessage += 1;
    }
    this.createShareMessageGroups();
  }

  openShareMessageComponent() {
    const initialState = {
      title: "Compartilhar Mensagem",
    };
    this.bsModalRef = this._modalService.show(ShareMessageComponent, {
      initialState,
      class: "modal-lg",
    });
    this.bsModalRef.content.closeBtnName = "Fechar";
  }
  // ***** End share message *****

  // *****Start sing with us *****
  loadCarouselSingWithUs() {
    this._lectureService.getFullLectures().subscribe({
      next: (resposta) => {
        let lectures: Lecture[] = [];
        this.songs = [];
        lectures = resposta.lectures;

        if (lectures && lectures.length > 0) {
          this.filterLecturesTypeAlegria(lectures);
        }
      },
      error: null,
      complete: () => {
        this.getVideos();
      },
    });
  }

  getVideos() {
    let $obs: Observable<any>[] = [];

    this.songs.map((song, index) => {
      if (song.contents) {
        let contentSong = song.contents[0];

        $obs.push(
          this._contentService.getContent(contentSong).pipe(
            map((response) => {
              this.songs[index].contents[0] = response.content;
            })
          )
        );
      }
    });

    concat($obs)
      .pipe(
        concatMap((observableContent) => {
          return observableContent;
        })
      )
      .subscribe({
        next: (response) => {},
        error: null,
        complete: () => {
          this.actualCarouselSingWithUs = 0;
          this.maxCarouselSingWithUs = 1;

          let vNumbers: string[] = (this.songs.length / 1)
            .toString()
            .split(".");
          this.maxCarouselSingWithUs = +vNumbers[0];
          let parteFlutuante: number = +vNumbers[1];

          if (parteFlutuante > 0) {
            this.maxCarouselSingWithUs += 1;
          }

          this.groupsCarouselSingWithUs = [];
          for (let i = 1; i <= this.maxCarouselSingWithUs; i++) {
            this.groupsCarouselSingWithUs.push(i);
          }

          if (!this.currentSongVideo) {
            this.currentSongVideo = this.songs[0].contents[0];
          }

          this._spinner.hide();
        },
      });
  }

  filterLecturesTypeAlegria(lectures: Lecture[]) {
    this.songs = lectures.filter((lecture, index) => {
      if (lecture.type == "alegria") {
        return true;
      }
      return false;
    });
  }

  previousCarouselSingWithUs() {
    if (this.actualCarouselSingWithUs > 0) {
      this.actualCarouselSingWithUs -= 1;
    } else {
      this.actualCarouselSingWithUs = this.maxCarouselSingWithUs - 1;
    }
    this.currentSongVideo = this.songs[
      this.actualCarouselSingWithUs
    ].contents[0];
  }

  nextCarouselSingWithUs() {
    if (this.actualCarouselSingWithUs == this.maxCarouselSingWithUs - 1) {
      this.actualCarouselSingWithUs = 0;
    } else {
      this.actualCarouselSingWithUs += 1;
    }
    this.currentSongVideo = this.songs[
      this.actualCarouselSingWithUs
    ].contents[0];
  }
  // *****End sing with us *****

  // *****Start music *****
  loadCarouselMusic() {
    this._lectureService.getFullLectures().subscribe({
      next: (response) => {
        this.musics = [];

        if (response.lectures && response.lectures.length > 0) {
          this.filterLecturesTypeAlegriaMusic(response.lectures);
        }

        this.actualCarouselMusic = 0;
        this.maxCarouselMusic = 1;

        let vNumbers: string[] = (this.musics.length / 3).toString().split(".");
        this.maxCarouselMusic = +vNumbers[0];
        let parteFlutuante: number = +vNumbers[1];

        if (parteFlutuante > 0) {
          this.maxCarouselMusic += 1;
        }

        this.groupsCarouselMusic = [];
        for (let i = 1; i <= this.maxCarouselMusic; i++) {
          this.groupsCarouselMusic.push(i);
        }

        this.createMusicGroups();
      },
      error: null,
      complete: () => {
        this.getContents();
      },
    });
  }

  getContents() {
    let $obs: Observable<any>[] = [];

    this.musics.map((music, index) => {
      if (music.contents) {
        let content = music.contents[0];

        $obs.push(
          this._contentService.getContent(content).pipe(
            map((response) => {
              this.musics[index].contents[0] = response.content;
            })
          )
        );
      }
    });

    concat($obs)
      .pipe(
        concatMap((observableContent) => {
          return observableContent;
        })
      )
      .subscribe({
        next: (response) => {},
        error: null,
        complete: () => {
          this.getDocuments();
        },
      });
  }

  getDocuments() {
    let $obs: Observable<any>[] = [];

    this.musics.map((music, index) => {
      if (music.contents) {
        let content = music.contents[0];

        $obs.push(
          this._documentService.getDocument(content.file).pipe(
            map((response) => {
              this.musics[index].contents[0].file = response.document;
            })
          )
        );
      }
    });

    concat($obs)
      .pipe(
        concatMap((observableContent) => {
          return observableContent;
        })
      )
      .subscribe({
        next: (response) => {},
        error: null,
        complete: () => {
          this.createMusicGroups();
        },
      });
  }

  createMusicGroups() {
    this.groupMusic = [];
    let indexStart = this.actualCarouselMusic * 3;
    let indexEnd = (this.actualCarouselMusic + 1) * 3;
    if (indexEnd > this.musics.length) {
      indexEnd = this.musics.length;
    }

    for (let i = indexStart; i < indexEnd; i++) {
      this.groupMusic.push(this.musics[i]);
    }
  }

  filterLecturesTypeAlegriaMusic(lectures: Lecture[]) {
    this.musics = lectures.filter((lecture, index) => {
      if (lecture.type == "alegria_music") {
        return true;
      }
      return false;
    });
  }

  previousCarouselMusic() {
    if (this.actualCarouselMusic > 0) {
      this.actualCarouselMusic -= 1;
    } else {
      this.actualCarouselMusic = this.maxCarouselMusic - 1;
    }
    this.createMusicGroups();
  }

  nextCarouselMusic() {
    if (this.actualCarouselMusic == this.maxCarouselMusic - 1) {
      this.actualCarouselMusic = 0;
    } else {
      this.actualCarouselMusic += 1;
    }
    this.createMusicGroups();
  }
  // *****End music *****

  // *****Start workshop *****
  loadCarouselWorkshop() {
    this._lectureService.getFullLectures().subscribe((response) => {
      this.workshops = [];

      if (response.lectures && response.lectures.length > 0) {
        this.filterLecturesTypeWorkshop(response.lectures);
      }

      this.actualCarouselWorkshop = 0;
      this.maxCarouselWorkshop = 1;

      let vNumbers: string[] = (this.workshops.length / 4)
        .toString()
        .split(".");
      this.maxCarouselWorkshop = +vNumbers[0];
      let parteFlutuante: number = +vNumbers[1];

      if (parteFlutuante > 0) {
        this.maxCarouselWorkshop += 1;
      }

      this.groupsCarouselWorkshop = [];
      for (let i = 1; i <= this.maxCarouselWorkshop; i++) {
        this.groupsCarouselWorkshop.push(i);
      }

      this.createWorkshopGroups();
    });
  }

  createWorkshopGroups() {
    this.groupWorkshop = [];
    let indexStart = this.actualCarouselWorkshop * 4;
    let indexEnd = (this.actualCarouselWorkshop + 1) * 4;
    if (indexEnd > this.workshops.length) {
      indexEnd = this.workshops.length;
    }

    for (let i = indexStart; i < indexEnd; i++) {
      this.groupWorkshop.push(this.workshops[i]);
    }
  }

  filterLecturesTypeWorkshop(lectures: Lecture[]) {
    this.workshops = lectures.filter((lecture, index) => {
      let now = new Date().getTime();
      let endWorkshop = new Date(lecture.end_time).getTime()
      if (lecture.type == "workshop" && now >= endWorkshop) {
        return true;
      }
      return false;
    });
  }

  previousCarouselWorkshop() {
    if (this.actualCarouselWorkshop > 0) {
      this.actualCarouselWorkshop -= 1;
    } else {
      this.actualCarouselWorkshop = this.maxCarouselWorkshop - 1;
    }
    this.createWorkshopGroups();
  }

  nextCarouselWorkshop() {
    if (this.actualCarouselWorkshop == this.maxCarouselWorkshop - 1) {
      this.actualCarouselWorkshop = 0;
    } else {
      this.actualCarouselWorkshop += 1;
    }
    this.createWorkshopGroups();
  }
  // *****End workshop *****

  newContent() {
    return new Content(
      "",
      "",
      0,
      "",
      false,
      false,
      false,
      "",
      null,
      null,
      "",
      "",
      "",
      "",
      "",
      "",
      false,
      "",
      false,
      "",
      "",
      null
    );
  }

  openConfirmPasswordComponent(){
    const initialState = {
      title: "Confirmação",
    };
    this.bsModalRef = this._modalService.show(ConfirmPasswordComponent, {
      initialState,
      class: "modal-lg",
    });
    this.bsModalRef.content.closeBtnName = "Fechar";
  }

  goToAudithorium(item: Lecture) {
    this._userGamificationService.setMissionComplete("Interatividade");
    this._router.navigate(["/audithorium", "lecture", item._id]);
  }

  OnDestroy() {
    this.modalSub.unsubscribe();
  }
}
