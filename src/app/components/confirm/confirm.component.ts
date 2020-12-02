import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public onClose: Subject<boolean> = new Subject<boolean>();

  public title: string;
  public message: string;
  public actionBtnName: string;
 
  constructor(public _bsModalRef: BsModalRef) {}
 
  public ngOnInit(){}

  public onConfirm(): void {
      this.onClose.next(true);
      this._bsModalRef.hide();
  }

}
