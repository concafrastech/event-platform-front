import { Component, OnInit } from "@angular/core";
import { ContentService } from "../../services/content.service";
import { Content } from "../../models/Content";

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
    "texto:Texto",
  ];
  public vTypes: any = {
    audio: "Áudio",
    img: "Imagem",
    doc: "Documento / PDF",
    zoom: "Sala do Zoom",
    youtube: "YouTube",
    externo: "Conteúdo externo",
    texto: "Texto",
  };
  public vContent: Content[] = [];
  select: string = "";

  constructor(private _contentService: ContentService) {
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

  onSelectFile(event: FileList, content: Content) {
    content.file = event[0];
  }

  onSubmit(form) {
    this.vContent.map((content) => {
      this._contentService.addContent(content).subscribe((item) =>{
        console.log(item);
        
      });
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
