import { UserGamificationService } from 'src/app/services/user-gamification.service';
import { DocumentService } from "./../../services/document.service";
import { ContentService } from "src/app/services/content.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { UploadService } from "../../services/upload.service";
import { GLOBAL } from "../../services/global";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { defineLocale } from "ngx-bootstrap/chronos";
import { ptBrLocale } from "ngx-bootstrap/locale";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { HttpEventType } from "@angular/common/http";
defineLocale("pt-br", ptBrLocale);

@Component({
  selector: "profile-edit",
  templateUrl: "./profile-edit.component.html",
  styleUrls: ["./profile-edit.component.css"],
  providers: [UserService, UploadService, ContentService, DocumentService],
})
export class ProfileEditComponent implements OnInit {
  public faUserCircle = faUserCircle;
  public title: string;
  public user: User;
  public status: string;
  public identity;
  public token;
  public url: string;
  public fileToUpload: File;
  public userInfoLevel;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _uploadService: UploadService,
    private _contentService: ContentService,
    private _documentService: DocumentService,
    private _bsLocaleService: BsLocaleService,
    public _userGamificationService: UserGamificationService
  ) {
    this.title = "Meu Perfil";
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.identity = this.user;
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: profile-edit.");
    this.loadUserImage();
    this._userGamificationService.setMissionComplete("edit-profile");
    this.userInfoLevel = this._userGamificationService.getInfoLevel();
  }

  loadUserImage() {
    if (this.user.image) {
      this._documentService
        .getDocument(this.user.image)
        .subscribe((response) => {
          this.user.image = response.document;
        });
    }
  }

  onSubmit() {
    if (this.fileToUpload) {
      this._contentService.uploadFile(this.fileToUpload).subscribe({
        next: (response) => {
          //Final do upload
          if (response.type == HttpEventType.Response) {
            this.user.image = response.body.document;
          }
        },
        error: null,
        complete: () => {
          this.updateUser();
        },
      });
    } else {
      console.log("Sem upload");
    }
  }

  updateUser() {
    this._userService.updateUser(this.user).subscribe(
      (response) => {
        if (!response.user) {
          this.status = "error";
        } else {
          this.status = "success";
          localStorage.setItem("identity", JSON.stringify(this.user));
          this.identity = this.user;
          /*this._uploadService
                        .makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload, this.token, 'image')
                        .then((result: any) => {
                            this.user.image = result.user.image;
                            localStorage.setItem('identity', JSON.stringify(this.user));
                        });*/
        }
      },
      (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }

  selectFile() {
    document.getElementById("select-img").click();
  }

  fileChangeEvent(fileInput: any) {
    this.fileToUpload = <File>fileInput.target.files[0];
  }
}
