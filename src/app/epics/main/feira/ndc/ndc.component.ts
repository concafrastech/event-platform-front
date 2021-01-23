import { StageService } from './../../../../services/stage.service';
import { Component, OnInit } from '@angular/core';
import { Stage } from 'src/app/models/stage';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ndc',
  templateUrl: './ndc.component.html',
  styleUrls: ['./ndc.component.css'],
  providers: [StageService, UserService]
})
export class NdcComponent implements OnInit {

  public stageList: Stage[] = [];

  constructor(private _stageService: StageService, private _userService: UserService,) {
  }

  ngOnInit(): void {
    let epic = JSON.parse(localStorage.getItem("currentEpic"));
    this._stageService.getFullStages(null, epic._id).subscribe((response)=>{
      this.stageList = response.stages;
      
    });
  }

}
