import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

  public onClose: Subject<boolean> = new Subject<boolean>();

  public title: string;
  public message: string;
  public actionBtnName: string;
  public closeBtnName: string;

  constructor(public _bsModalRef: BsModalRef) {}

  public ngOnInit(){}

  public onConfirm(): void {
      this.onClose.next(true);
      this._bsModalRef.hide();
  }

  public onCancel(): void {
      this.onClose.next(false);
      this._bsModalRef.hide();
  }
}
