import { Component, Input, OnInit } from "@angular/core";
import { ContentService } from "../../services/content.service";
import { Content } from "../../models/content";
import { HttpEventType } from "@angular/common/http";

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
  @Input() public vContent: Content[] = [];
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
    let files: Set<File> = new Set<File>();
    files.add(event[0]);

    content.fileToUpload = event[0]
    /*let sub = this._contentService.uploadFile(files).subscribe((response) => {
      //Começou o upload
      if (response.type == HttpEventType.Sent) {
        //É possível adicionar uma barre de progresso ou um spinner ao inicializar o upload.
      } else if (response.type == HttpEventType.UploadProgress) {
        //Progresso
      } else if (response.type == HttpEventType.Response) {
        sub.unsubscribe();
        //Final do upload
        content.file = response.body;
      }
    });*/
  }

  /*onSubmit(form) {
    this.vContent.map((content) => {
      this._contentService.addContent(content).subscribe((item) =>{
        console.log(item);
        
      });
    });
  }*/

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
