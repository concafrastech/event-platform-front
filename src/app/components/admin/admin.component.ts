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
  public types: any = ['audio:Áudio','img:Image','doc:Documento / PDF','zoom:Sala do Zoom','youtube:YouTube','externo:Conteúdo externo'];
  public contents: any;

  constructor(
    private _adminService: AdminService
  ) {
    this.title = 'Gerenciamento de conteúdo';
    this.flagConteudo = true;
    this.contents = [];
  }

  ngOnInit(): void {
    console.log('[OK] Component: admin.');
    this._adminService.helloWorld();
  }

  submitType(value) {
    console.log(value);
    let content = {}
    if(value == 'youtube') {
      content = {
        id: 'YouTube',
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
    }
    this.contents.push(content);
    console.log(this.contents);
  }

  changeFlag(flag) {
    if(flag == 'especifico')
      this.flagConteudo = true;
    else
      this.flagConteudo = false;
  }

}
