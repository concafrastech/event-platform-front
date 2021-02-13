import { UserGamificationService } from './../../../services/user-gamification.service';
import { UserService } from "src/app/services/user.service";
import { EpicService } from "./../../../services/epic.service";
import { Epic } from "src/app/models/epic";
import { BookClubComponent } from "./../book-club/book-club.component";
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
} from "@angular/core";
import { Lecture } from "src/app/models/lecture";
import { LectureService } from "src/app/services/lecture.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Schedule } from "src/app/models/schedule";

@Component({
  selector: "app-hub",
  templateUrl: "./hub.component.html",
  styleUrls: ["./hub.component.css"],
  providers: [EpicService, UserService, LectureService],
})
export class HubComponent implements OnInit, AfterViewInit {
  public status: string;
  public svgMap: HTMLObjectElement;
  public bsModalRef: BsModalRef;
  public currentEpic: Epic;
  public identity;
  public todaySchedule: Schedule[];
  public todayEvents: Lecture[] = [];
  public svgTooltip: string = "";

  //Data/Hora dos momentos tira dúvidas
  public startAskQuestions = new Date("2021-02-13 17:00:00");
  public endAskQuestions = new Date("2021-02-13 17:30:00");

  //Links sala zoom tira dúvidas
  public linkCfasZoom: string =
    "https://us02web.zoom.us/j/83486418907?pwd=NE5qRGNlQ2lRMHVtSnd0Ulk4dmJaQT09";
  public linkCecxZoom: string =
    "https://us02web.zoom.us/j/87689309836?pwd=RVlsbG5aWjBTeEJ6TW1oMjZzK0ZLQT09";
  public linkClubZoom: string =
    "https://us02web.zoom.us/j/86034908996?pwd=V2grRVdzMzhDUFdXTDhXc3A4ZzY4QT09";
  public linkEditoraZoom: string =
    "https://us02web.zoom.us/j/87852650772?pwd=VHJZdUJFdGtIV0FrQ2h6WHpvcWdKQT09";

  options = {
    zoomEnabled: true,
    controlIconsEnabled: true,
    minZoom: 0.5,
    maxZoom: 0.8,
    preventMouseEventsDefault: false,
    dblClickZoomEnabled: false,
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _modalService: BsModalService,
    private elementRef: ElementRef,
    private zone: NgZone,
    private _epicService: EpicService,
    private _userService: UserService,
    private _lectureService: LectureService,
    private _userGamificationService: UserGamificationService
  ) {}

  ngOnInit(): void {
    this.currentEpic = JSON.parse(localStorage.getItem("currentEpic"));
    this.identity = this._userService.getIdentity();
    this.loadScheduleEpic();
  }

  ngAfterViewInit() {
    this.svgMap = <HTMLObjectElement>(
      this.elementRef.nativeElement.querySelector("#svgMap")
    );

    this.svgMap.addEventListener("load", this.loadSvgMapEvents.bind(this));
  }

  loadSvgMapEvents() {
    let eventType = "click";
    let svgDoc = this.svgMap.contentDocument;

    let palestrasContainer = svgDoc.getElementById("PALESTRAS");

    palestrasContainer.addEventListener(
      eventType,
      this.eventClickSvg.bind(this, "PALESTRAS")
    );
    svgDoc.getElementById("PALESTRAS").addEventListener("mouseenter", () => {
      this.setSvgInfo("Palestras");
    });
    svgDoc.getElementById("PALESTRAS").addEventListener("mouseleave", () => {
      this.setSvgInfo("");
    });

    svgDoc
      .getElementById("ndc")
      .addEventListener(eventType, this.eventClickSvg.bind(this, "ndc"));
    svgDoc.getElementById("ndc").addEventListener("mouseenter", () => {
      this.setSvgInfo("Novas Dimensões do Conhecimento");
    });
    svgDoc.getElementById("ndc").addEventListener("mouseleave", () => {
      this.setSvgInfo("");
    });

    svgDoc
      .getElementById("livros")
      .addEventListener(eventType, this.eventClickSvg.bind(this, "livros"));
    svgDoc.getElementById("livros").addEventListener("mouseenter", (ev) => {
      this.setSvgInfo("Livraria");
    });
    svgDoc.getElementById("livros").addEventListener("mouseleave", () => {
      this.setSvgInfo("");
    });

    svgDoc
      .getElementById("ccex")
      .addEventListener(eventType, this.eventClickSvg.bind(this, "ccex"));
    svgDoc.getElementById("ccex").addEventListener("mouseenter", (ev) => {
      this.setSvgInfo("CAMPANHA DE ESCLARECIMENTO CHICO XAVIER");
    });
    svgDoc.getElementById("ccex").addEventListener("mouseleave", () => {
      this.setSvgInfo("");
    });

    svgDoc
      .getElementById("cfas")
      .addEventListener(eventType, this.eventClickSvg.bind(this, "cfas"));
    svgDoc.getElementById("cfas").addEventListener("mouseenter", (ev) => {
      this.setSvgInfo("CAMPANHA DE FRATERNIDADE AUTA DE SOUZA");
    });
    svgDoc.getElementById("cfas").addEventListener("mouseleave", () => {
      this.setSvgInfo("");
    });

    svgDoc
      .getElementById("stand_voluntario")
      .addEventListener(
        eventType,
        this.eventClickSvg.bind(this, "stand_voluntario")
      );
    svgDoc
      .getElementById("stand_voluntario")
      .addEventListener("mouseenter", () => {
        this.setSvgInfo("Clube do Livro");
      });
    svgDoc
      .getElementById("stand_voluntario")
      .addEventListener("mouseleave", () => {
        this.setSvgInfo("");
      });

    svgDoc
      .getElementById("jovem")
      .addEventListener(eventType, this.eventClickSvg.bind(this, "jovem"));
    svgDoc.getElementById("jovem").addEventListener("mouseenter", () => {
      this.setSvgInfo("Concafras - Jovem");
    });
    svgDoc.getElementById("jovem").addEventListener("mouseleave", () => {
      this.setSvgInfo("");
    });

    svgDoc
      .getElementById("stand_editora")
      .addEventListener(
        eventType,
        this.eventClickSvg.bind(this, "stand_editora")
      );
    svgDoc
      .getElementById("stand_editora")
      .addEventListener("mouseenter", () => {
        this.setSvgInfo("Editora Auta de Souza");
      });
    svgDoc
      .getElementById("stand_editora")
      .addEventListener("mouseleave", () => {
        this.setSvgInfo("");
      });

    svgDoc
      .getElementById("EVENTO_AO_VIVO")
      .addEventListener(
        eventType,
        this.eventClickSvg.bind(this, "EVENTO_AO_VIVO")
      );
    svgDoc
      .getElementById("EVENTO_AO_VIVO")
      .addEventListener("mouseenter", () => {
        this.setSvgInfo("Evento ao Vivo (Palco)");
      });
    svgDoc
      .getElementById("EVENTO_AO_VIVO")
      .addEventListener("mouseleave", () => {
        this.setSvgInfo("");
      });

    svgDoc
      .getElementById("clube_do_livro")
      .addEventListener(
        eventType,
        this.eventClickSvg.bind(this, "clube_do_livro")
      );
    svgDoc
      .getElementById("clube_do_livro")
      .addEventListener("mouseenter", () => {
        this.setSvgInfo("Formação de Trabalhadores Espíritas");
      });
    svgDoc
      .getElementById("clube_do_livro")
      .addEventListener("mouseleave", () => {
        this.setSvgInfo("");
      });

    svgDoc
      .getElementById("concafrinhas")
      .addEventListener(
        eventType,
        this.eventClickSvg.bind(this, "concafrinhas")
      );
    svgDoc.getElementById("concafrinhas").addEventListener("mouseenter", () => {
      this.setSvgInfo("Concafrinhas");
    });
    svgDoc.getElementById("concafrinhas").addEventListener("mouseleave", () => {
      this.setSvgInfo("");
    });
  }

  loadScheduleEpic() {
    this.todaySchedule = [];
    this._epicService
      .getSchedules(this.currentEpic._id, this.identity._id)
      .subscribe(
        (response) => {
          if (response) {
            let schedules = response;
            schedules.sort(this.sortSchedules);

            //Monta agenda do dia
            for (let i = 0; i < schedules.length; i++) {
              this.createTodaySchedule(schedules[i]);
            }
          }
        },
        (error) => {
          var errorMessage = <any>error;
          console.log(errorMessage);

          if (errorMessage != null) {
            this.status = "error";
          }
        },
        () => {
          this.getTodayEvents();
        }
      );
  }

  //Ordena agenda
  sortSchedules(obj1: Schedule, obj2: Schedule) {
    if (obj1.start_time < obj2.start_time) {
      return -1;
    }
    if (obj1.start_time > obj2.start_time) {
      return 1;
    }
    return 0;
  }

  //Cria agenda do dia
  createTodaySchedule(schedule: Schedule) {
    let today = new Date();
    let startDay = new Date(schedule.start_time);
    let todayTime = today.getTime();
    let startTime = startDay.getTime();
    let endTime = new Date(schedule.end_time).getTime();

    //Só permite schedule do tipo lecture
    if (schedule.type == "lecture") {
      //Verifica se está agendado para hoje
      if (
        today.getDate() == startDay.getDate() &&
        today.getMonth() == startDay.getMonth() &&
        today.getFullYear() == startDay.getFullYear()
      ) {
        //Verifica se o horário ainda não passou
        if (
          today.getHours() < startDay.getHours() ||
          (today.getHours() == startDay.getHours() &&
            today.getMinutes() <= startDay.getMinutes()) ||
          (todayTime >= startTime && todayTime <= endTime)
        ) {
          this.todaySchedule.push(schedule);
        }
      }
    }
  }

  //Busca somente eventos do palco principal
  getTodayEvents() {
    this.todaySchedule.map((schedule) => {
      this._lectureService.getLecture(schedule.id).subscribe((response) => {
        if (response.lecture.type == "momento_coletivo") {
          this.todayEvents.push(response.lecture);
        }
      });
    });
  }

  //Busca evento que esteja acontecendo agora.
  eventIsHappening(): string {
    let today = new Date();
    this._userGamificationService.setMissionComplete("Momento Coletivo");

    for (let i = 0; i < this.todayEvents.length; i++) {
      let start = new Date(this.todayEvents[i].start_time);
      let end = new Date(this.todayEvents[i].end_time);

      //Ainda não acabou e já começou
      if (
        today.getTime() < end.getTime() &&
        today.getTime() >= start.getTime()
      ) {
        return `/audithorium/lecture/${this.todayEvents[i]._id}`;
      }
    }
    alert("Atividade fechada! Retorne mais tarde e fique atento a programação");
    return null;
  }

  askQuestionsTime(stand: string) {
    let today = new Date();
    if (
      today.getTime() >= this.startAskQuestions.getTime() &&
      today.getTime() <= this.endAskQuestions.getTime()
    ) {
      this._userGamificationService.setMissionComplete("Tira Dúvidas");
      setTimeout(() => {
        switch (stand) {
          case "cfas":
            window.location.href = this.linkCfasZoom;
            break;
          case "cecx":
            window.location.href = this.linkCecxZoom;
            break;
          case "club":
            window.location.href = this.linkClubZoom;
            break;
          case "editora":
            window.location.href = this.linkEditoraZoom;
            break;
        }
      }, 2000);
      alert('Aguarde, você está sendo redirecionado...');

    } else {
      return true;
    }
    return false;
  }

  //Trata evento click no svg do hub
  eventClickSvg(id: string) {
    switch (id) {
      case "PALESTRAS":
        console.log("palestras");
        this.redirectToFromSvg("/palestras");
        break;

      case "ndc":
        console.log("ndc");
        this.redirectToFromSvg("/ndc");
        break;

      case "livros":
        window.location.href = "http://www.editoraautadesouza.com.br/";
        break;

      case "ccex":
        console.log("ccex");
        if (this.askQuestionsTime("cecx")) {
          this.redirectToFromSvg("/audithorium-special/cecx");
        }
        break;

      case "cfas":
        console.log("cfas");
        if (this.askQuestionsTime("cfas")) {
          this.redirectToFromSvg("/audithorium-special/cfas");
        }
        break;

      case "stand_voluntario":
        console.log("stand_voluntario");
        if (this.askQuestionsTime("club")) {
          this.redirectToFromSvg("/audithorium-special/clube");
        }

        break;

      case "jovem":
        this.redirectToFromSvg("/jovem/home");
        break;

      case "stand_editora":
        console.log("stand_editora");
        if (this.askQuestionsTime("editora")) {
          this.redirectToFromSvg("/audithorium-special/editora");
        }
        break;

      case "EVENTO_AO_VIVO":
        console.log("EVENTO_AO_VIVO");
        let url = this.eventIsHappening();
        if (url) {
          this.redirectToFromSvg(url);
        }
        break;

      case "clube_do_livro":
        console.log("clube_do_livro");
        this.openBookClubComponent();
        break;

      case "concafrinhas":
        this.redirectToFromSvg("/concafrinhas/home");
        break;
    }
  }
  
  liveEvent(){
    console.log("EVENTO_AO_VIVO");
    let url = this.eventIsHappening();
    if (url) {
      this.redirectToFromSvg(url);
    }
  }

  setSvgInfo(info: string) {
    this.zone.run(() => (this.svgTooltip = info));
  }

  //Redireciona para uma url interna saindo do contexto do svg
  redirectToFromSvg(path: string) {
    // if (path == "/ndc" || path == "/palestras") {
    //   alert(
    //     "Atividade fechada! Retorne mais tarde e fique atento a programação"
    //   );
    // } else {
    //   this.zone.run(() => this._router.navigate([path]));
    // }
    this.zone.run(() => this._router.navigate([path]));
  }

  //Modal
  openBookClubComponent() {
    const initialState = {
      title: "Escolha como deseja acessar o nosso curso:",
    };
    this.bsModalRef = this._modalService.show(BookClubComponent, {
      initialState,
      class: "modal-lg",
    });
    this.bsModalRef.content.closeBtnName = "Fechar";
  }
}
