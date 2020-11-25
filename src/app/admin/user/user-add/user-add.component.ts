import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { User } from 'src/app/models/user';
import { GLOBAL } from 'src/app/services/global';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
  providers: [UserService, UploadService]

})
export class UserAddComponent implements OnInit {

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
    private _bsLocaleService: BsLocaleService
  ) { 
    this.title = 'Adicionar Usuário';
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log('[OK] Component: user-add.');
    this.identity = this._userService.getIdentity();
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
                  this.user = response.user;
              } else {
                  this.status = 'error';
              }
          },
          error => {
              console.log(<any>error);
              this._router.navigate(['/admin/user/list', this.userId]);
          }
      );
  }

  onSubmit() {
    this._userService.updateUser(this.user).subscribe(
        response => {
            if (!response.user) {
                this.status = 'error';
            } else {
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