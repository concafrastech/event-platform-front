import { ShareMessageComponent } from "./../share-message/share-message.component";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { UserService } from "src/app/services/user.service";
import { ShareMessage } from "src/app/models/share-message";
import { Instagram } from "src/app/models/instagram";
import { ShareMessageService } from "src/app/services/share-message.service";
import { Subscription } from "rxjs";
import { SocialFeedService } from "src/app/services/social-feed.service";

@Component({
  selector: "app-caravan-space",
  templateUrl: "./caravan-space.component.html",
  styleUrls: ["./caravan-space.component.css"],
  providers: [ UserService, ShareMessageService, SocialFeedService, BsModalService ]
})
export class CaravanSpaceComponent implements OnInit {
  public bsModalRef: BsModalRef;
  public messages: ShareMessage[] = [];
  public actualCarousel: number = 0;
  public maxCarousel: number = 0;
  public groupsCarousel: number[] = [];
  public groupMessages: ShareMessage[] = [];
  public modalSub: Subscription;
  public feeds: Instagram[] = [];

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _modalService: BsModalService,
    private _shareMessageService: ShareMessageService,
    private _socialFeedService: SocialFeedService, 
  ) {}

  ngOnInit(): void {
    this.modalSub = this._modalService.onHidden.subscribe((resposta)=>{
      this.loadCarousel();
    });
    this.loadCarousel();
    this.loadSocialFeed();
  }

  loadSocialFeed(){
    this._socialFeedService.getSocialFeeds().subscribe(
      (resposta) => {
        this.feeds = resposta;
      }
    ) 
  }

  loadCarousel(){
    this._shareMessageService.getFullShareMessages(null).subscribe((resposta) => {
      this.messages = resposta.shareMessages;
      this.actualCarousel = 0;
      this.maxCarousel = 1;

      let vNumbers: string[] = (this.messages.length / 4).toString().split(".");
      this.maxCarousel = +vNumbers[0];
      let parteFlutuante: number = +vNumbers[1];

      if (parteFlutuante > 0) {
        this.maxCarousel += 1;
      }

      this.groupsCarousel = [];
      for (let i = 1; i <= this.maxCarousel; i++) {
        this.groupsCarousel.push(i);
      }

      this.createShareMessageGroups()
    });
  }

  createShareMessageGroups(){
    this.groupMessages = [];
    let indexStart = this.actualCarousel * 4;
    let indexEnd = (this.actualCarousel +1) * 4;
    if(indexEnd > this.messages.length){
      indexEnd = this.messages.length;
    }

    for(let i = indexStart; i < indexEnd; i++){
      this.groupMessages.push(this.messages[i]);
    }
  }

  previousCarousel() {
    if (this.actualCarousel > 0) {
      this.actualCarousel -= 1;
    } else {
      this.actualCarousel = this.maxCarousel - 1;
    }
    this.createShareMessageGroups();
  }

  nextCarousel() {
    if (this.actualCarousel == this.maxCarousel - 1) {
      this.actualCarousel = 0;
    } else {
      this.actualCarousel += 1;
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

  OnDestroy(){
    this.modalSub.unsubscribe();
  }
}
