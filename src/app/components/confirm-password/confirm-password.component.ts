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
  passwordError: boolean = false;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onConfirm(){
    if(this.password == "ConcafrasVirtual@2021"){
      window.open("https://sites.google.com/view/comissoes-concafras-2021", "_blank");
      this.bsModalRef.hide();
    }else{
      this.passwordError = true;
    }
  }
}
