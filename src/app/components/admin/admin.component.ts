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

  constructor(
    private _adminService: AdminService
  ) {
    this.title = 'Tela Administrativa';
    this.flagConteudo = true;
  }

  ngOnInit(): void {
    console.log('[OK] Component: admin.');
    this._adminService.helloWorld();
  }

  changeFlag(flag) {
    if(flag == 'especifico')
      this.flagConteudo = true;
    else
      this.flagConteudo = false;
  }

}
