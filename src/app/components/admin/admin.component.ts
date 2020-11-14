import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService]
})
export class AdminComponent implements OnInit {
  public title: String;
  public flagConteudo: Boolean;
  public types: any = ['audio:Áudio','img:Imagem','doc:Documento / PDF','zoom:Sala do Zoom','youtube:YouTube','externo:Conteúdo externo'];
  public contents: any;
  public ordem: any;

  constructor(
    private _adminService: AdminService
  ) {
    this.title = 'Gerenciamento de conteúdo';
    this.flagConteudo = true;
    this.contents = [];
    this.ordem = 0;
  }

  ngOnInit(): void {
    console.log('[OK] Component: admin.');
    this._adminService.helloWorld();
  }

  submitType(value) {
    let content = {}

    this.ordem++;

    if(value == 'youtube') {
      content = {
        id: 'YouTube' + this.ordem,
        ordem: this.ordem,
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
        id: 'Zoom' + this.ordem,
        ordem: this.ordem,
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
        id: 'Áudio' + this.ordem,
        ordem: this.ordem,
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
        id: 'Imagem' + this.ordem,
        ordem: this.ordem,
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
        id: 'Documentos' + this.ordem,
        ordem: this.ordem,
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
        id: 'Externo' + this.ordem,
        ordem: this.ordem,
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
    let arr = this.contents;

    arr = this.arrayRemove(arr, event);

    this.ordem--;

    this.contents = arr;
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
