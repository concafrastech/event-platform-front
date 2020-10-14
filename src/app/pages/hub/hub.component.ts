import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as SvgPanZoom from 'svg-pan-zoom';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit, AfterViewInit {

  options = { 
    zoomEnabled: true,
    controlIconsEnabled: true,
    minZoom: 0.1,
    maxZoom: 10,
    preventMouseEventsDefault: false,
    dblClickZoomEnabled: false
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // initializing the function
    let svgPanZoom: SvgPanZoom.Instance = SvgPanZoom('#svgMap', this.options);
    /* see typing definiton for more APIs. */
    svgPanZoom.zoom(0.8);

  }

}
