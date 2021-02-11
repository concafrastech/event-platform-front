import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  public closeBtnName: string;
  public title: string;
  public email: string;

  constructor(
    private _userService: UserService,
    private _modalService: BsModalService,
    private _route: ActivatedRoute,
    private _router: Router,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  resetPass() {
    if(this.email != "") {
      this._userService.setResetPassword(this.email).subscribe({
        next: (response) => {
          console.log("NEXT");
          console.log(response);
        },
        error: (response) => {
          if(response.status == 500) {
            alert("Usuário não encontrado!")
          }
        },
        complete: () => {
          this._router.navigate(['/login']);
          this.bsModalRef.hide();
        }
      });
    } else {
      alert("Escreva um email válido");
    }

  }

}
