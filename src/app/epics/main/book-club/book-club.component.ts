import { UserGamificationService } from 'src/app/services/user-gamification.service';
import { DocumentService } from "./../../../services/document.service";
import { ClassroomService } from "./../../../services/classroom.service";
import { Trail } from "./../../../models/trail";
import { Component, NgZone, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { User } from "src/app/models/user";
import { ServerTimeService } from "src/app/services/server-time.service";
import { Classroom } from "src/app/models/classroom";
import { ContentService } from "src/app/services/content.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-book-club",
  templateUrl: "./book-club.component.html",
  styleUrls: ["./book-club.component.css"],
  providers: [ClassroomService, ContentService, DocumentService],
})
export class BookClubComponent implements OnInit {
  public title: string;
  public urlZoom: string =
    "https://us02web.zoom.us/j/83822992319?pwd=U3RMTmMxK09pMlZMaGFBR0FRR01Pdz09";
  public trails: Trail[];
  public user: User;
  public now: Date;
  public momentOne: Classroom;
  public momentTwo: Classroom;
  public practical: Classroom[];

  //Data/Hora dos momentos e curso prático
  public startMomentOne = new Date("2021-02-13 15:00:00");
  public endMomentOne = new Date("2021-02-13 17:00:00");
  public startMomentTwo = new Date("2021-02-14 08:30:00");
  public endMomentTwo = new Date("2021-02-14 10:00:00");
  public startPratical = new Date("2021-02-14 10:00:00");
  public endPratical = new Date("2021-02-14 12:00:00");

  //Colocar link zoom das classrooms
  constructor(
    private _classroomService: ClassroomService,
    private _contentService: ContentService,
    private _serverTime: ServerTimeService,
    public modalRef: BsModalRef,
    private _zone: NgZone,
    private _router: Router,
    private _userGamificationService: UserGamificationService
  ) {}

  ngOnInit() {
    let subscription = JSON.parse(localStorage.getItem("currentSubscription"));
    this.user = subscription.user;

    if (subscription) {
      this.trails = subscription.trails;
    }

    this.trails.forEach((trail, index) => {
      this.getClassrooms(trail, index);
    });
  }

  getClassrooms(trail, indexTrail) {
    if (trail.classrooms) {
      trail.classrooms.forEach((classroom, index) => {
        this._classroomService.getClassroom(classroom).subscribe(
          (response) => {
            let classroomaux = response.classroom;
            classroomaux.start_time = new Date(classroomaux.start_time);
            classroomaux.end_time = new Date(classroomaux.end_time);
            trail.classrooms[index] = classroomaux;
            this.getContents(classroomaux, indexTrail, index);
          },
          (error) => {
            var errorMessage = <any>error;
            console.log(errorMessage);
          }
        );
      });
      this.trails[indexTrail] = trail;
    }
  }

  getContents(classroom: Classroom, indexTrail, indexClassroom) {
    if (classroom.contents) {
      classroom.contents.forEach((content, index) => {
        this._contentService.getContent(content).subscribe((response) => {
          let content = response.content;
          classroom.contents[index] = content;
        });
      });

      this.trails[indexTrail].classrooms[indexClassroom] = classroom;
    }
  }

  //Armazena a quantidade de milisegundos do GMT de Brasília até o GMT Internacional
  //brazilianTimeOffset = -180 * 60000;
  //Armazena a quantidade de milisegundos do GMT local do usuário até o GMT Internacional
  //userTimeOffset = -new Date().getTimezoneOffset() * 60000;
  //Ajusta datas de inicio e termino dos cursos para hora local do usuário
  //Exemplo: momento 1 começa sábado as 15 horas horário de brasília GMT-3, mas para usuários com fusos diferentes de GMT-3 precisa atualizar
  // processTimeOffset() {
  //   let diferenceUserBrazilianTimeOffset =
  //     this.userTimeOffset - this.brazilianTimeOffset;
  //   this.startMomentOne = new Date(
  //     this.startMomentOne.valueOf() + diferenceUserBrazilianTimeOffset
  //   );
  //   this.endMomentOne = new Date(
  //     this.endMomentOne.valueOf() + diferenceUserBrazilianTimeOffset
  //   );
  //   this.startMomentTwo = new Date(
  //     this.startMomentTwo.valueOf() + diferenceUserBrazilianTimeOffset
  //   );
  //   this.endMomentTwo = new Date(
  //     this.endMomentTwo.valueOf() + diferenceUserBrazilianTimeOffset
  //   );
  //   this.startPratical = new Date(
  //     this.startPratical.valueOf() + diferenceUserBrazilianTimeOffset
  //   );
  //   this.endPratical = new Date(
  //     this.endPratical.valueOf() + diferenceUserBrazilianTimeOffset
  //   );
  // }

  openVideo() {
    this._serverTime.getServerTime().subscribe((response) => {
      this.now = new Date(response.message.time * 1000);
      let classroom = this.getAvaliableContent(this.trails[0]);
      if (classroom) {
        classroom.contents.forEach((content) => {
          if (content.type == "youtube") {
            this.goToAudithorium(`audithorium/classroom/${classroom._id}`);
          }
        });
      } else {
        this.errorMessage();
      }
    });
  }

  openAudio() {
    this._serverTime.getServerTime().subscribe((response) => {
      this.now = new Date(response.message.time * 1000);
      let classroom = this.getAvaliableContent(this.trails[0]);
      if (classroom) {
        classroom.contents.forEach((content) => {
          if (content.type == "audio") {
            this.goToAudithorium(`audithorium/classroom/${classroom._id}`);
          }
        });
      } else {
        this.errorMessage();
      }
    });
  }

  goToAudithorium(url) {
    this._zone.run(() => this._router.navigate([url]));
  }

  getAvaliableContent(trail: Trail) {
    this.practical = [];

    for (let i = 0; i < trail.classrooms.length; i++) {
      if (trail.classrooms[i].type == "teorico") {
        if (!this.momentOne || this.momentOne._id == "") {
          this.momentOne = trail.classrooms[i];
        } else {
          this.momentTwo = trail.classrooms[i];
        }
      } else {
        this.practical.push(trail.classrooms[i]);
      }
    }

    if (
      this.now.getTime() >= this.startMomentOne.getTime() &&
      this.now.getTime() <= this.endMomentOne.getTime()
    ) {
      this._userGamificationService.setMissionComplete("Momento Doutrinário Ciclo 1");
      return this.momentOne;
    } else if (
      this.now.getTime() >= this.startMomentTwo.getTime() &&
      this.now.getTime() <= this.endMomentTwo.getTime()
    ) {
      this._userGamificationService.setMissionComplete("Momento Doutrinário Ciclo 2");
      return this.momentTwo;
    } else if (
      this.now.getTime() >= this.startPratical.getTime() &&
      this.now.getTime() <= this.endPratical.getTime()
    ) {
      this._userGamificationService.setMissionComplete("Vivência Prática de Voluntariado Espírita");
      let defaultPratical: Classroom;
      let userPratical: Classroom;

      //Curso geral
      defaultPratical = this.practical.find((classroom, index) => {
        if (classroom.tags == null || !classroom.tags || classroom.tags.length == 0) {
          return true;
        }
      });

      if(!defaultPratical){
        defaultPratical = this.practical[0];
      }

      //Curso usuário
      userPratical = this.practical.find((classroom, index) => {
        let tagUser = classroom.tags.find((tag, i) => {
          if (tag.toUpperCase() == this.user.state.toUpperCase()) {
            return true;
          }
        });

        if (tagUser) {
          return true;
        }
      });

      //Se existir curso para a região do usuário retorna, senão retorna geral
      return userPratical ? userPratical : defaultPratical;
    }
  }

  errorMessage() {
    alert("Não há conteúdo disponível neste momento");
  }

  redirectTo() {
    this._zone.run(() => this._router.navigate(["/diference"]));
    this.modalRef.hide();
  }
}
