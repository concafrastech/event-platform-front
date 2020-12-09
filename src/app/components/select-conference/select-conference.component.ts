import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/models/subscription';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-select-conference',
  templateUrl: './select-conference.component.html',
  styleUrls: ['./select-conference.component.css'],
  providers: [ UserService ]
})
export class SelectConferenceComponent implements OnInit {
  public subscriptions: Subscription[] = [];
  public identity;
  public currentSubscription;

  constructor(
    private _userService : UserService 
  ) { }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
    this.currentSubscription = JSON.parse(localStorage.getItem('currentSubscription'));
    if(this.subscriptions == null || this.subscriptions.length == 0){
      //FIX-ME: REMOVER ISSO
      this.mockSubscription(this.identity._id);  
    }
  }

  mockSubscription(userId){
    this._userService.getMockSubscription(userId).subscribe(
      response => {
        this.subscriptions = [ response ]; 
        this.identity.subscriptions = this.subscriptions;
        localStorage.setItem('subscriptions', JSON.stringify(this.subscriptions));
        localStorage.setItem('currentSubscription', JSON.stringify(this.subscriptions[0]));
        localStorage.setItem('currentConference', JSON.stringify(this.subscriptions[0].conference));
        localStorage.setItem('mocked', 'true');
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        
        if (errorMessage != null) {
            //this.status = 'error';
        }
      }
    );
  }

}
