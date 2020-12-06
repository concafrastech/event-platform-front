import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { User } from 'src/app/models/user';
import { GLOBAL } from 'src/app/services/global';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService, UploadService]

})
export class UserEditComponent implements OnInit {

  public title: string;
  public userId: string;
  public url: string;
  public status: string;
  public user: User;
  public identity: string;
  public token: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _uploadService: UploadService,
    private _bsLocaleService: BsLocaleService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = 'Editar Usuário';
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log('[OK] Component: user-edit.');
    this._spinner.show();
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.loadPage();
  }

  loadPage() {
    this._route.params.subscribe(
        params => {
            this.userId = params['id'];
            this.getUser(this.userId);
        }
    );
  }

  getUser(id) {
      this._userService.getUser(id).subscribe(
          response => {
              if (response.user) {
                  this._spinner.hide();
                  this.user = response.user;
              } else {
                  this._spinner.hide();
                  this.status = 'error';
              }
          },
          error => {
              this._spinner.hide();
              console.log(<any>error);
              this._router.navigate(['/admin/user/list', this.userId]);
          }
      );
  }

  onSubmit() {
      this._spinner.show();
      this._userService.updateUser(this.user).subscribe(
          response => {
              if (!response.user) {
                  this._spinner.hide();
                  this.status = 'error';
              } else {
                  this._spinner.hide();
                  this.status = 'success';
                  localStorage.setItem('identity', JSON.stringify(this.user));
                  this._uploadService
                      .makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload, this.token, 'image')
                      .then((result: any) => {
                          this.user.image = result.user.image;
                          localStorage.setItem('identity', JSON.stringify(this.user));
                      });
              }
          },
          error => {
              this._spinner.hide();
              var errorMessage = <any> error;
              console.log(errorMessage);
              if (errorMessage != null) {
                  this.status = 'error';
              }
          }
      );
  }


  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput: any) {
      this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
