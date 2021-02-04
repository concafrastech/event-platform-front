import { Component, OnInit } from '@angular/core';
import { Trail } from 'src/app/models/trail';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-user-trails',
  templateUrl: './user-trails.component.html',
  styleUrls: ['./user-trails.component.css'],
  providers: [ClassroomService]
})
export class UserTrailsComponent implements OnInit {

  public trails: Trail[];
  public status: string;

  constructor(
    private _classroomService: ClassroomService
  ) { }

  ngOnInit(): void {
      var subscription = JSON.parse(localStorage.getItem('currentSubscription'));
      if(subscription){
        this.trails = subscription.trails;
      }

      this.trails.forEach((trail, index) => {
        this.getClassrooms(trail, index);
      });

  }

  getClassrooms(trail, ind) {
    if(trail.classrooms){
      trail.classrooms.forEach((classroom, index) => {
        this._classroomService.getClassroom(classroom).subscribe(
          (response) => {
            let classroomaux = response.classroom;
            classroomaux.start_time = new Date(classroomaux.start_time);
            classroomaux.end_time = new Date(classroomaux.end_time);
            trail.classrooms[index] = classroomaux;
          },
          (error) => {
            var errorMessage = <any>error;
            console.log(errorMessage);
    
            if (errorMessage != null) {
              this.status = "error";
            }
          }
        );
      });
      this.trails[ind] = trail;
    }
  }

}
