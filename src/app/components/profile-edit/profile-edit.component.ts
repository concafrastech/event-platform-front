import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {UploadService} from '../../services/upload.service';
import {GLOBAL} from '../../services/global';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);

@Component({
    selector: 'profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['./profile-edit.component.css'],
    providers: [UserService, UploadService]
})
export class ProfileEditComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;
    public identity;
    public token;
    public url: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _uploadService: UploadService,
        private _bsLocaleService: BsLocaleService
    ) {
        this.title = 'Meu Perfil';
        this.user = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.identity = this.user;
        this.url = GLOBAL.url;
        this._bsLocaleService.use("pt-br");
    }

    ngOnInit() {
        console.log('[OK] Component: profile-edit.');
    }

    onSubmit() {
        this._userService.updateUser(this.user).subscribe(
            response => {
                if (!response.user) {
                    this.status = 'error';
                } else {
                    this.status = 'success';
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    this.identity = this.user;
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
