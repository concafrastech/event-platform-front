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
  private indice;

  constructor(
    private _adminService: AdminService
  ) {
    this.title = 'Gerenciamento de conteúdo';
    this.flagConteudo = true;
    this.contents = [];
    this.indice = 0;
  }

  ngOnInit(): void {
    console.log('[OK] Component: admin.');
    this._adminService.helloWorld();
  }

  submitType(value) {
    console.log(value);
    let content = {}

    this.indice++;

    if(value == 'youtube') {
      content = {
        id: 'YouTube',
        indice: this.indice,
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
        id: 'Zoom',
        indice: this.indice,
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
        id: 'Áudio',
        indice: this.indice,
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
        id: 'Imagem',
        indice: this.indice,
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
        id: 'Documentos',
        indice: this.indice,
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
        id: 'Externo',
        indice: this.indice,
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

    this.contents.push(content);
    console.log(this.contents.length);
    console.log(this.indice);
  }

  removeType() {
    console.log("Clicou aqui");
  }

  changeFlag(flag) {
    if(flag == 'especifico')
      this.flagConteudo = true;
    else
      this.flagConteudo = false;
  }

}
