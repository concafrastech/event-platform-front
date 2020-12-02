import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/models/subscription';

@Component({
  selector: 'app-select-conference',
  templateUrl: './select-conference.component.html',
  styleUrls: ['./select-conference.component.css']
})
export class SelectConferenceComponent implements OnInit {
  public subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {
    this.subscriptions = JSON.parse(localStorage.getItem('subscriptions'));
  }

}
