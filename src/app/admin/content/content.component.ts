import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [ContentService]
})
export class ContentComponent implements OnInit {
  public title: String;
  public flagConteudo: Boolean;
  public types: any = ['audio:Áudio','img:Imagem','doc:Documento / PDF','zoom:Sala do Zoom','youtube:YouTube','externo:Conteúdo externo'];
  public contents: any;
  public idAux: any;

  constructor(
    private _contentService: ContentService
  ) {
    this.title = 'Gerenciamento de conteúdo';
    this.flagConteudo = true;
    this.contents = [];
    this.idAux = 0;
  }

  ngOnInit(): void {
    console.log('[OK] Component: admin.');
    this._contentService.helloWorld();
  }

  submitType(value) {
    let content = {}

    this.idAux++;

    if(value == 'youtube') {
      content = {
        id: 'youtube' + this.idAux,
        title: 'YouTube',
        inputs: [
          {
            name: 'YouTubeLive',
            label: 'Link Vídeo',
            type: 'text',
            placeholder: 'URL ao vivo (Youtube / Vimeo)'
          },
          {
            name: 'YouTubeGravado',
            label: 'Link Reserva',
            type: 'text',
            placeholder: 'URL do vídeo gravado (Youtube / Vimeo)'
          }
        ]
      }
    } else if(value == 'zoom') {
      content = {
        id: 'zoom' + this.idAux,
        title: 'Zoom',
        inputs: [
          {
            name: 'API_KEY',
            label: 'API_KEY',
            type: 'text',
            placeholder: 'Insira aqui sua API_KEY'
          },{
            name: 'API_SECRET',
            label: 'API_SECRET',
            type: 'text',
            placeholder: 'Insira aqui sua API_SECRET'
          },{
            name: 'Zoom',
            label: 'Número da Sala',
            type: 'text',
            placeholder: 'Insira aqui o número da sala do Zoom'
          }
        ]
      }
    } else if(value == 'audio') {
      content = {
        id: 'audio' + this.idAux,
        title: 'Áudio',
        inputs: [
          {
            name: 'Audio',
            label: 'Arquivo de áudio',
            type: 'file',
            placeholder: ''
          }
        ]
      }
    } else if(value == 'img') {
      content = {
        id: 'imagem' + this.idAux,
        title: 'Imagem',
        inputs: [
          {
            name: 'Imagem',
            label: 'Arquivo de imagem',
            type: 'file',
            placeholder: ''
          }
        ]
      }
    } else if(value == 'doc') {
      content = {
        id: 'documentos' + this.idAux,
        title: 'Documentos',
        inputs: [
          {
            name: 'Documentos',
            label: 'Documentos / PDF',
            type: 'file',
            placeholder: ''
          }
        ]
      }
    } else if(value == 'externo') {
      content = {
        id: 'externo' + this.idAux,
        title: 'Externo',
        inputs: [
          {
            name: 'Externo',
            label: 'Conteúdo externo',
            type: 'text',
            placeholder: 'URL do conteúdo externo (Jogo, conteúdo interativo, etc...)'
          }
        ]
      }
    }

    if(value != "")
      this.contents.push(content);
  }

  removeType(event) {
    console.log(event);

    let arr = this.contents;

    arr = this.arrayRemove(arr, event);

    this.idAux--;

    this.contents = arr;

    console.log(this.contents);
  }

  private arrayRemove(arr, value) {
    return arr.filter(function(element) {
      return element.id != value.id;
    });
  }

  changeFlag(flag) {
    if(flag == 'especifico')
      this.flagConteudo = true;
    else
      this.flagConteudo = false;
  }

}
