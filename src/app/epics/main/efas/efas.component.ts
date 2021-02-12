import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Content } from 'src/app/models/content';

@Component({
  selector: 'app-efas',
  templateUrl: './efas.component.html',
  styleUrls: ['./efas.component.css']
})
export class EfasComponent implements OnInit {

  public closeBtnName: string;
  public title: string;
  public bsModalRefFraternal: BsModalRef;
  public actualContent: Content
  public isLoading = true;
  
  constructor(private _modalService: BsModalService,
    public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.actualContent = this.temporaryContent(
      "https://youtu.be/2TmVU9jNNw8"
    );
    this.isLoading = false;
  }

  private temporaryContent(url: string) {
    return new Content(
      null,
      null,
      0,
      null,
      null,
      true,
      true,
      url,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
  }

}
