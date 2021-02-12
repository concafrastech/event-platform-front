import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Classroom } from "../../../models/classroom";
import { ClassroomService } from "../../../services/classroom.service";
import { UserService } from "../../../services/user.service";
import { GLOBAL } from "../../../services/global";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { DeleteConfirmComponent } from "src/app/components/delete-confirm/delete-confirm.component";
import { ConfirmComponent } from "src/app/components/confirm/confirm.component";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-classroom-list",
  templateUrl: "./classroom-list.component.html",
  styleUrls: ["./classroom-list.component.css"],
  providers: [UserService, ClassroomService],
})
export class ClassroomListComponent implements OnInit {
  @Input() trailId: string = null;
  public title: string;
  public url: string;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public total;
  public pages: number[] = [];
  public classrooms: Classroom[];
  public follows;
  public follow_me;
  public status: string;
  public bsModalRef: BsModalRef;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _classroomService: ClassroomService,
    private _userService: UserService,
    private modalService: BsModalService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Lista de Cursos";
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this._spinner.show();
    this.actualPage();
  }

  actualPage() {
    this._route.params.subscribe((params) => {
      let page = +params["page"];
      this.page = page;

      if (!params["page"]) {
        page = 1;
      }

      if (!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if (this.prev_page <= 0) {
          this.prev_page = 1;
        }
      }
      this.getClassrooms(page, this.trailId);
    });
  }

  getClassrooms(page, trailId) {
    this._classroomService.getClassrooms(page, trailId).subscribe(
      (response) => {
        if (!response.classrooms) {
          this.status = "error";
          this._spinner.hide();
        } else {
          this._spinner.hide();
          this.total = response.total;
          this.classrooms = response.classrooms;
          this.pages = [];
          for (let i = 1; i <= response.pages; i++) {
            this.pages.push(i);
          }
          if (this.pages && page > this.pages.length) {
            this._router.navigate(["/admin/classroom/list", 1]);
          }else{
            this._router.navigate(["/admin/classroom/list", page]);
          }
        }
      },
      (error) => {
        this._spinner.hide();
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }

  canDeleteClassroom(classroom: Classroom) {
    if (classroom.contents && classroom.contents.length > 0) {
      this.errorDeleteModal(classroom);
    } else {
      this.openDeleteConfirm(classroom);
    }
  }

  errorDeleteModal(classroom: Classroom) {
    const initialState = {
      title: "Não é possível excluir o curso",
      message: "O curso: " + classroom.name + " possui conteúdo.",
    };
    this.bsModalRef = this.modalService.show(ConfirmComponent, {
      initialState,
    });
    this.bsModalRef.content.actionBtnName = "OK";
  }

  openDeleteConfirm(classroom: Classroom) {
    const initialState = {
      title: "Excluir Curso",
      message:
        "Deseja realmente excluir o curso : " +
        classroom.name +
        "? <br> Essa ação não poderá ser desfeita.",
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmComponent, {
      initialState,
    });
    this.bsModalRef.content.actionBtnName = "Excluir";
    this.bsModalRef.content.closeBtnName = "Cancelar";

    this.bsModalRef.content.onClose.subscribe(
      (result) => {
        if (result) {
          this.deleteClassroom(classroom._id);
        }
      },
      (err) => {
        console.log(err);
        this.status = "error";
      }
    );
  }

  deleteClassroom(id) {
    this._classroomService.deleteClassroom(id).subscribe(
      (response) => {
        this.actualPage();
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
}
