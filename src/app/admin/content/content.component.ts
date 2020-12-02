import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ContentService } from "../../services/content.service";
import { Content } from "../../models/content";
import { HttpEventType } from "@angular/common/http";
import { AbstractControl, NgForm, NgModel, ValidatorFn } from "@angular/forms";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"],
  providers: [ContentService],
})
export class ContentComponent implements OnInit {
  public pageTitle: String;
  public types: any = [
    "audio:Áudio",
    "img:Imagem",
    "doc:Documento / PDF",
    "zoom:Sala do Zoom",
    "youtube:YouTube",
    "externo:Conteúdo externo",
  ];
  public vTypes: any = {
    audio: "Áudio",
    img: "Imagem",
    doc: "Documento / PDF",
    zoom: "Sala do Zoom",
    youtube: "YouTube",
    externo: "Conteúdo externo",
  };


  select: string = "";
  
  @Input() public vContent: Content[] = [];
  @Output() public contentFormIsValid = new EventEmitter();

  constructor() {
    this.pageTitle = "Gerenciamento de conteúdo";
  }

  ngOnInit(): void {    
  }

  ngOnChanges(): void {

  }

  addContent() {
    if (this.select) {
      this.vContent.push(
        new Content(
          0,
          this.select,
          this.vContent.length + 1,
          "",
          false,
          false,
          false,
          "",
          null,
          null,
          "",
          "",
          "",
          "",
          false,
          "",
          false,
          "",
          "",
          0
        )
      );
    }
  }

  onChangeForm(form: NgForm){
    this.contentFormIsValid.emit(form.valid);
  }

  onSelectFile(event: FileList, content: Content) {
    let files: Set<File> = new Set<File>();
    files.add(event[0]);

    content.fileToUpload = event[0];
  }

  removeType(event) {
    this.vContent = this.arrayRemove(this.vContent, event);
    this.reprocessingSequence();
  }

  private arrayRemove(arr, value) {
    return arr.filter(function (element) {
      return element.sequence != value.sequence;
    });
  }

  private reprocessingSequence() {
    let sequence = 0;
    this.vContent.map((content) => {
      content.sequence = ++sequence;
    });
  }
}
