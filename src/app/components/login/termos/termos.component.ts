import { SubscriptionService } from 'src/app/services/subscription.service';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-termos',
  templateUrl: './termos.component.html',
  styleUrls: ['./termos.component.css'],
  providers: [SubscriptionService]
})
export class TermosComponent implements OnInit {

  public check: boolean = false;
  public errorMsg: boolean = false;

  constructor(private location: Location, private _router: Router, private _subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
  }

  confirmar(){
    this.errorMsg = false;
    if(this.check){
      let subscription = JSON.parse(localStorage.getItem('currentSubscription'));

      if(subscription){
        this._subscriptionService.updateFirstLogin(subscription._id).subscribe((response)=>{})
      }

      this._router.navigate(['/welcome'])

    }else{
      this.errorMsg = true;
    }
  }

  back() {
    this.location.back();
  }
}
