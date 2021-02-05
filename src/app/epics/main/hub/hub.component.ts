import { BookClubComponent } from './../book-club/book-club.component';
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
} from "@angular/core";
import { Lecture } from "src/app/models/lecture";
import { Stage } from "src/app/models/stage";
import { Trail } from "src/app/models/trail";
import { ActivityService } from "src/app/services/activity.service";
import { ClassroomService } from "src/app/services/classroom.service";
import { LectureService } from "src/app/services/lecture.service";
import { StageService } from "src/app/services/stage.service";
import { TrailService } from "src/app/services/trail.service";
import * as SvgPanZoom from "svg-pan-zoom";
import * as $ from "jquery";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-hub",
  templateUrl: "./hub.component.html",
  styleUrls: ["./hub.component.css"],
})
export class HubComponent implements OnInit, AfterViewInit {
  public status: string;
  public svgMap: HTMLObjectElement;
  public bsModalRef: BsModalRef;

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
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    /*$( () => {
      // initializing the function
      let svgPanZoom: SvgPanZoom.Instance = SvgPanZoom('#svgMap', this.options);
      svgPanZoom.zoom(0.6);
    });*/

    this.svgMap = <HTMLObjectElement>(
      this.elementRef.nativeElement.querySelector("#svgMap")
    );
    this.svgMap.addEventListener("load", this.loadSvgMapEvents.bind(this));
    
  }

  loadSvgMapEvents() {
    let eventType = "click";
    let svgDoc = this.svgMap.contentDocument;
    svgDoc.getElementById("PALESTRAS").addEventListener(eventType, this.eventClickSvg.bind(this, "PALESTRAS"));
    svgDoc.getElementById("PALESTRAS").addEventListener("mouseover", ()=>{
    })

    svgDoc.getElementById("PALESTRAS").addEventListener("mouseleave", ()=>{
      
    })
    
    svgDoc
      .getElementById("ndc")
      .addEventListener(eventType, this.eventClickSvg.bind(this, "ndc"));
    svgDoc
      .getElementById("livros")
      .addEventListener(eventType, this.eventClickSvg.bind(this, "livros"));
    svgDoc
      .getElementById("ccex")
      .addEventListener(eventType, this.eventClickSvg.bind(this, "ccex"));
    svgDoc
      .getElementById("cfas")
      .addEventListener(eventType, this.eventClickSvg.bind(this, "cfas"));
    svgDoc
      .getElementById("stand_voluntario")
      .addEventListener(
        eventType,
        this.eventClickSvg.bind(this, "stand_voluntario")
      );
    svgDoc
      .getElementById("jovem")
      .addEventListener(eventType, this.eventClickSvg.bind(this, "jovem"));
    svgDoc
      .getElementById("stand_editora")
      .addEventListener(
        eventType,
        this.eventClickSvg.bind(this, "stand_editora")
      );
    svgDoc
      .getElementById("EVENTO_AO_VIVO")
      .addEventListener(
        eventType,
        this.eventClickSvg.bind(this, "EVENTO_AO_VIVO")
      );
    svgDoc
      .getElementById("clube_do_livro")
      .addEventListener(
        eventType,
        this.eventClickSvg.bind(this, "clube_do_livro")
      );
    svgDoc
      .getElementById("concafrinhas")
      .addEventListener(
        eventType,
        this.eventClickSvg.bind(this, "concafrinhas")
      );
  }

  eventMouseLeave(item){

  }

  eventMouseOver(item){

  }

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
        this.redirectToFromSvg("/audithorium-special/cecx");
        break;

      case "cfas":
        console.log("cfas");
        this.redirectToFromSvg("/audithorium-special/cfas");
        break;

      case "stand_voluntario":
        console.log("stand_voluntario");
        this.redirectToFromSvg("/audithorium-special/clube");
        break;

      case "jovem":
        this.redirectToFromSvg("/jovem/home");
        break;

      case "stand_editora":
        console.log("stand_editora");
        this.redirectToFromSvg("/audithorium-special/editora");
        break;

      case "EVENTO_AO_VIVO":
        console.log("EVENTO_AO_VIVO");
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

  redirectToFromSvg(path: string) {
    this.zone.run(() => this._router.navigate([path]));
  }

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
