  import { Component, OnInit, Input } from "@angular/core";
  import { ActivatedRoute, Router } from "@angular/router";
  import { Activity } from "src/app/models/activity";
  import { Stage } from "src/app/models/stage";
  import { ActivityService } from "src/app/services/activity.service";
  import { DocumentService } from "src/app/services/document.service";
  import { NavbarService } from "src/app/services/navbar.service";
  import { StageService } from "src/app/services/stage.service";
  import { UserService } from "src/app/services/user.service";
  
  @Component({
    selector: 'app-jovem-list',
    templateUrl: './jovem-list.component.html',
    styleUrls: ['./jovem-list.component.css'],
    providers: [StageService, ActivityService, UserService, DocumentService],
  })
  export class JovemListComponent implements OnInit {
    @Input() public id: string;
    public activityList: Activity[] = [];
    public stage: Stage;
    public title: String;
    public type: String;
  
    constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _stageService: StageService,
      private _documentService: DocumentService,
      private _activityService: ActivityService,
      public _navbarService: NavbarService,
      private _userService: UserService
    ) {}
  
    ngOnInit(): void {
      this._route.params.subscribe(params => {
        let id = params['id'];
        this.id = id;
        console.log(id);
        this._stageService.getStage(id).subscribe((response) => {
          this.stage = response.stage;
          this.title = response.stage.name;
          this.type = response.stage.type.toLowerCase();
          this.activityList = response.stage.activities;
          this.loadThumbnails();
        });
      });
    }
  
    loadThumbnails() {
      this.activityList.map((activity) => {
        if (activity.thumbnail) {
          this._documentService
            .getDocument(activity.thumbnail)
            .subscribe((response) => {
              activity.thumbnail = response.document;
            });
        }
      });
    }
  
    goToAudithorium(item: Activity) {
      this._router.navigate(["/audithorium", "activity", item._id]);
    }
  
    ngAfterViewInit(): void {
      this._navbarService.setButtonBack(true);
    }
  
    ngOnDestroy(): void {
      this._navbarService.setButtonBack(false);
    }
  }


