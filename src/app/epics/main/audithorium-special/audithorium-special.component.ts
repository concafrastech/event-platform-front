import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audithorium-special',
  templateUrl: './audithorium-special.component.html',
  styleUrls: ['./audithorium-special.component.css']
})
export class AudithoriumSpecialComponent implements OnInit {

  public pageTarget: String;
  public typeAudithorium: String;

  constructor() { }

  ngOnInit(): void {
    this.typeAudithorium = "CFAS";

    if (this.typeAudithorium == "CFAS")
      this.pageTarget = "https://forms.gle/5VfA4iy2nk7EHjk36";
    else if (this.typeAudithorium == "CECX")
      this.pageTarget = "https://forms.gle/2RPsHWcfDistBuFX8";
    else if (this.typeAudithorium == "Clube")
      this.pageTarget = "https://forms.gle/ztEy9xRVLKCiBA6Z6";
    else if (this.typeAudithorium == "Editora")
      this.pageTarget = "https://forms.gle/QPFkjtDedsrnen5A9";

    console.log(this.pageTarget);

  }

}
