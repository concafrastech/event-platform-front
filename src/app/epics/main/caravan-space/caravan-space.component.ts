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

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _modalService: BsModalService,
    private _shareMessageService: ShareMessageService,
    private _lectureService: LectureService,
    private _contentService: ContentService,
    private _socialFeedService: SocialFeedService
  ) {}

  ngOnInit(): void {
    this.modalSub = this._modalService.onHidden.subscribe((resposta) => {
      this.loadCarouselShareMessages();
    });

    this.isVideoLoading = true;
    this.loadCarouselShareMessages();
    this.loadCarouselSingWithUs();
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
    this._lectureService.getLectures(2).subscribe({
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
        console.log("complete");
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
      false,
      "",
      false,
      "",
      "",
      null
    );
  }
  // *****End sing with us *****

  OnDestroy() {
    this.modalSub.unsubscribe();
  }
}
