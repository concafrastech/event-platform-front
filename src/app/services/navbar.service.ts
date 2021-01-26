import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NavbarService {
  private buttonBack: boolean = false;

  constructor() {}

  public setButtonBack(visible: boolean) {
    this.buttonBack = visible;
  }

  public ButtonBackIsVisible(){
    return this.buttonBack;
  }
}
