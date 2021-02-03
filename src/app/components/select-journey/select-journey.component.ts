import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Conference } from 'src/app/models/conference';
import { Epic } from 'src/app/models/epic';
import { EpicService } from 'src/app/services/epic.service';

@Component({
  selector: 'app-select-journey',
  templateUrl: './select-journey.component.html',
  styleUrls: ['./select-journey.component.css'],
  providers: [EpicService]
})
export class SelectJourneyComponent implements OnInit {

  public status: string;
  public epics: Epic[] = [];
  public page;
  public conference: Conference;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _epicService: EpicService,
  ) { }

  ngOnInit(): void {
    this.conference = JSON.parse(localStorage.getItem('currentConference'));
    this.getEpics(1, this.conference._id);
  }

  getEpics(page, conferenceId) {
    this._epicService.getEpics(page, conferenceId).subscribe(
      (response) => {
        if (!response.epics) {
          this.status = "error";
        } else {
          this.epics = response.epics;
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

  selectEpic(epic){
    localStorage.setItem('currentEpic', JSON.stringify(epic));
    if(epic.type == 'adulto'){
      localStorage.setItem('epic', null);
    }else{
      localStorage.setItem('epic', epic.type);
    }
    this._router.navigate(['/termos'])
  }

  // gotoInfancia(epic){
  //   localStorage.setItem('currentEpic', JSON.stringify(epic));
  //   localStorage.setItem('epic', 'infancia');
  //   this._router.navigate(['/concafrinhas/home']);
  // }

  // gotoJovem(epic){
  //   localStorage.setItem('currentEpic', JSON.stringify(epic));
  //   localStorage.setItem('epic', 'jovem');
  //   this._router.navigate(['/jovem/home']);
  // }

  // gotoPrincipal(epic){
  //   localStorage.setItem('currentEpic', JSON.stringify(epic));
  //   localStorage.setItem('epic', null);
  //   this._router.navigate(['/home']);
  // }

}
