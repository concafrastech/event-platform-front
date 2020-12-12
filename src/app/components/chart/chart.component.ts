import { Component, OnInit } from "@angular/core";
import { ActivityService } from "src/app/services/activity.service";
import { ClassroomService } from "src/app/services/classroom.service";
import { EpicService } from "src/app/services/epic.service";
import { LectureService } from "src/app/services/lecture.service";
import { TrailService } from "src/app/services/trail.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
  providers: [
    UserService,
    LectureService,
    ClassroomService,
    TrailService,
    EpicService,
    ActivityService,
  ],
})
export class ChartComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _lectureService: LectureService,
    private _classroomService: ClassroomService,
    private _trailService: TrailService,
    private _epicService: EpicService,
    private _activityService: ActivityService
  ) {}

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = [
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
  ];
  public barChartType = "bar";
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Series B" },
  ];

  public doughnutChartLabels = ["Sales Q1", "Sales Q2", "Sales Q3", "Sales Q4"];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = "doughnut";

  public radarChartLabels = ["Q1", "Q2", "Q3", "Q4"];
  public radarChartData = [
    { data: [120, 130, 180, 70], label: "2017" },
    { data: [90, 150, 200, 45], label: "2018" },
  ];
  public radarChartType = "radar";

  // public pieChartLabels = ["Usuários", "Sales Q2", "Sales Q3", "Sales Q4"];
  public pieChartLabels = [];
  // public pieChartData = [120, 150, 180, 90];
  public pieChartData = [];
  public pieChartType = "pie";

  public chartColors: any[] = [
    {
      backgroundColor: ["#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0"],
    },
  ];

  ngOnInit(): void {
    this.getAllResources();
  }

  private getAllResources() {
    this.getTotalUsers();
    this.getTotalLectures();
    this.getTotalClassroom();
    this.getTotalTrails();
    this.getTotalEpics();
    this.getTotalActivities();
  }

  private getTotalUsers() {
    this._userService.getUsers().subscribe((response) => {
      console.log(response);
      let numberTotal = 0;
      numberTotal = response.total;
      this.insertOnChartPie(numberTotal, "Usuários");
    });
  }

  private getTotalLectures() {
    this._lectureService.getLectures().subscribe((response) => {
      let numberTotal = 0;
      numberTotal = response.total;
      this.insertOnChartPie(numberTotal, "Palestras");
    });
  }

  private getTotalClassroom() {
    this._classroomService.getClassrooms().subscribe((response) => {
      let numberTotal = 0;
      numberTotal = response.total;
      this.insertOnChartPie(numberTotal, "Cursos");
    });
  }

  private getTotalTrails() {
    this._trailService.getTrails().subscribe((response) => {
      let numberTotal = 0;
      numberTotal = response.total;
      this.insertOnChartPie(numberTotal, "Trilhas");
    });
  }

  private getTotalEpics() {
    this._epicService.getEpics().subscribe((response) => {
      let numberTotal = 0;
      numberTotal = response.total;
      this.insertOnChartPie(numberTotal, "Épicos");
    });
  }

  private getTotalActivities() {
    this._activityService.getActivities().subscribe((response) => {
      let numberTotal = 0;
      numberTotal = response.total;
      this.insertOnChartPie(numberTotal, "Atividades");
    });
  }

  private insertOnChartPie(total, nameLabel) {
    if (total != 0) {
      this.pieChartLabels.push(nameLabel);
      this.pieChartData.push(total);
    }
  }
}
