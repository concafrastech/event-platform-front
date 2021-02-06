import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {

  title: string = "Informe a senha para continuar"
  password: string = "";
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
