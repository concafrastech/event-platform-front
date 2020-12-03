import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ContentService } from "../../services/content.service";
import { DocumentService } from "./../../services/document.service";
import { Content } from "../../models/content";
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
        content.file = null;
      });
  }

  removeType(event) {
    if (event._id) {
      if (event.file) {
        this._documentService
          .deleteDocument(event.file._id)
          .subscribe((response) => {
            this._contentService
              .deleteContent(event._id)
              .subscribe((response) => {
                this.arrayRemove(event);
              });
          });
      }
    } else {
      this.arrayRemove(event);
    }
  }

  private arrayRemove(contentToRemove: Content) {
    let index = this.vContent.indexOf(contentToRemove);
    this.vContent.splice(index, 1);
    this.reprocessingSequence();
  }

  private reprocessingSequence() {
    let sequence = 0;
    this.vContent.map((content) => {
      content.sequence = ++sequence;
    });
  }
}
