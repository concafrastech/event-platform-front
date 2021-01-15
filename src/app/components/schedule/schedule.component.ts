import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
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

  public groupSchedules: any[] = [];
  public schedules : Schedule[] = [];
  public status : string;

  constructor(
    private _userService : UserService,
    private _epicService : EpicService,
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit(): void {
    let epic = JSON.parse(localStorage.getItem('currentEpic'));
    let identity = this._userService.getIdentity();

    this._epicService.getSchedules(epic._id, identity._id).subscribe(
      (response) => {
        if(response){
          this.schedules = response;
          this.schedules.sort(this.sortSchedules);
          for(let i = 0; i < this.schedules.length; i++){
            let day = new Date(this.schedules[i].start_time).getDate();
            

            if(!this.findDayGroupSchedule(day)){
              this.groupSchedules.push({day: day, schedule: [this.schedules[i]]});
            }else{
              this.findDayGroupSchedule(day).schedule.push(this.schedules[i])
            }
            /*if(this.groupSchedules.indexOf(day) == -1){
              
            }*/
            
            //console.log(this.schedules[i].start_time.getDay().toString());
          }

          console.log(this.groupSchedules);
          
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

  findDayGroupSchedule(day: number){
    return this.groupSchedules.find((item, index, arr)=>{
      if(item.day == day){
        return true
      }
    })
  }

  sortSchedules(obj1:Schedule, obj2:Schedule){
    if(obj1.start_time < obj2.start_time){
      return -1;
    }
    if(obj1.start_time > obj2.start_time){
      return 1;
    }
    return 0;
  }

}
