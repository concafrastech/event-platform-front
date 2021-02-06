import { ElementRef, EventEmitter, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JivoChatService {
  
  private chatActive: boolean = false;
  private showJivoChat = new EventEmitter<boolean>();

  constructor() { }

  getJivoChat(){
    return this.showJivoChat;
  }


  showChat(){
    this.chatActive = true;
    this.showJivoChat.emit(this.chatActive);
  }

  hideChat(){
    this.chatActive = false;
    this.showJivoChat.emit(this.chatActive);
  }
}
