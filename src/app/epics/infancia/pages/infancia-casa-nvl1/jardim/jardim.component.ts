import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'src/app/models/subscription';
import { UserService } from 'src/app/services/user.service';
import { Epic } from 'src/app/models/epic';
import { Lecture } from 'src/app/models/lecture';
import { Stage } from 'src/app/models/stage';
import { Trail } from 'src/app/models/trail';
import { ActivityService } from 'src/app/services/activity.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { LectureService } from 'src/app/services/lecture.service';
import { StageService } from 'src/app/services/stage.service';
import { TrailService } from 'src/app/services/trail.service';

@Component({
  selector: 'app-jardim',
  templateUrl: './jardim.component.html',
  styleUrls: ['./jardim.component.css'],
  providers: [LectureService, TrailService, StageService, ActivityService, ClassroomService]
})
export class JardimComponent implements OnInit {

  @Input() public dialog: string;
  public identity;
  public subscription: Subscription;
  public epic: Epic;
  public status: string;
  public lectures: Lecture[] = [];
  public trails: Trail[] = [];
  public stages: Stage[] = [];
  public time: string;

  options = {
    zoomEnabled: true,
    controlIconsEnabled: true,
    minZoom: 0.5,
    maxZoom: 0.8,
    preventMouseEventsDefault: false,
    dblClickZoomEnabled: false
  };


  private TemaCentralBegins = new Date('02/13/2021 11:00:00 GMT-0300').toLocaleString();
  private TemaCentralEnds = new Date('02/13/2021 11:30:00 GMT-0300').toLocaleString();

  private OficinaArteBegins = new Date('02/13/2021 11:30:00 GMT-0300').toLocaleString();
  private OficinaArteEnds = new Date('02/13/2021 12:00:00 GMT-0300').toLocaleString();

  private TemaEspecificoBegins = new Date('02/13/2021 17:00:00 GMT-0300').toLocaleString();
  private TemaEspecificoEnds = new Date('02/13/2021 17:30:00 GMT-0300').toLocaleString();

  private TemaEspecificoSalaVitualBegins = new Date('02/13/2021 17:30:00 GMT-0300').toLocaleString();
  private TemaEspecificoSalaVitualEnds = new Date('02/13/2021 18:30:00 GMT-0300').toLocaleString();
  public allowSalaVirtual = false;

  private AfterAtvBegins = new Date('02/13/2021 12:00:00 GMT-0300').toLocaleString();
  private AfterAtvEnds = new Date('02/13/2021 17:00:00 GMT-0300').toLocaleString();

  private allOpenedBegins = new Date('02/13/2021 18:30:00 GMT-0300').toLocaleString();
  private allOpenedEnds = new Date('02/14/2021 16:00:00 GMT-0300').toLocaleString();

  private now = new Date().toLocaleString();
  // private now = new Date('02/14/2021 11:40:00 GMT-0300').toLocaleString();

  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,

    private _userService: UserService,
    private _trailService: TrailService,
    ) { }

  openModalTemaCentral(template: TemplateRef<any>) {
    if ((this.now >= this.TemaCentralBegins && this.now < this.TemaCentralEnds) || (this.now >= this.allOpenedBegins && this.now < this.allOpenedEnds) || (this.now >= this.AfterAtvBegins && this.now < this.AfterAtvEnds)) {
      if (this.modalRef) {
        this.modalRef.hide();
      }
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert("Atividade fechada! Por favor, retorne para atividade da programação do evento.");
    }
  }

  openModalTemaEspecifico(template: TemplateRef<any>) {
    if ((this.now >= this.TemaEspecificoBegins && this.now < this.TemaEspecificoEnds) || (this.now >= this.allOpenedBegins && this.now < this.allOpenedEnds) || (this.now >= this.AfterAtvBegins && this.now < this.AfterAtvEnds)) {
      if (this.modalRef) {
        this.modalRef.hide();
      }
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert("Atividade fechada! Por favor, retorne para atividade da programação do evento.");
    }
  }

  openModalOficinaArte(template: TemplateRef<any>) {
    if ((this.now >= this.OficinaArteBegins && this.now < this.OficinaArteEnds) || (this.now >= this.allOpenedBegins && this.now < this.allOpenedEnds) || (this.now >= this.AfterAtvBegins && this.now < this.AfterAtvEnds)) {
      if (this.modalRef) {
        this.modalRef.hide();
      }
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert("Atividade fechada! Por favor, retorne para atividade da programação do evento.");
    }
  }

  openAlert() {
    alert("Sala Virtual fechada! Por favor, aguarde até 17:30 conforme a programação do evento.");
  }

  verifyAllowSalaVirtual() {
    if (this.now >= this.TemaEspecificoSalaVitualBegins && this.now < this.TemaEspecificoSalaVitualEnds) {
      this.allowSalaVirtual = true;
    }
  }

  ngOnInit() {
    this.verifyAllowSalaVirtual();
    let epic = JSON.parse(localStorage.getItem('currentEpic'));
    this.identity = this._userService.getIdentity();
    this.subscription = JSON.parse(localStorage.getItem('currentSubscription'));
    this.getTrails(1, epic._id);
  }

  getTrails(page, epicId) {
    this._trailService.getTrails(page, epicId).subscribe(
      (response) => {
        if (!response.trails) {
          this.status = "error";
        } else {
          this.trails = response.trails;

          //incluido filtro das trilhas da ilha
          this.trails = this.trails.filter((trail: Trail) => trail._id === this.subscription.trails[0]._id);

          // this.trails.forEach((trail, index) => {
          //   console.log(trail._id)
          //   console.log(trail.name)
          //   // this.getClassrooms(page, trail, index); // nao tem classroom pq é static
          // });
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
}