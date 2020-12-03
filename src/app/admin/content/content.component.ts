import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ContentService } from "../../services/content.service";
import { DocumentService } from "./../../services/document.service";
import { Content } from "../../models/content";
import { Document } from "../../models/document";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"],
  providers: [ContentService, DocumentService],
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

  constructor(
    private _contentService: ContentService,
    private _documentService: DocumentService
  ) {
    this.pageTitle = "Gerenciamento de conteúdo";
  }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.vContent) {
      this.vContent.map((content) => {
        console.log(content.file);
      });
    }
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

  onChangeForm(form: NgForm) {
    this.contentFormIsValid.emit(form.valid);
  }

  onSelectFile(event: FileList, content: Content) {
    let files: Set<File> = new Set<File>();
    files.add(event[0]);

    content.fileToUpload = event[0];
  }

  onRemoveFile(content: Content) {
    this._documentService
      .deleteDocument(content.file._id)
      .subscribe((response) => {
        console.log(response);
        content.file = null;
        console.log(this.vContent);
      });
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
