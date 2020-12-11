import { Component, OnInit } from '@angular/core';
import { Schedule } from 'src/app/models/schedule';
import { EpicService } from 'src/app/services/epic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [UserService, EpicService]
})
export class ScheduleComponent implements OnInit {

  public schedules : Schedule[] = [];
  public status : string;

  constructor(
    private _userService : UserService,
    private _epicService : EpicService,
  ) { }

  ngOnInit(): void {
    let epic = JSON.parse(localStorage.getItem('currentEpic'));
    let identity = this._userService.getIdentity();

    this._epicService.getSchedules(epic._id, identity._id).subscribe(
      (response) => {
        if(response){
          this.schedules = response;
        }
      },
      (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );

  }

}
