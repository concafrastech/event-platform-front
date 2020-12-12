import { Component, OnInit } from "@angular/core";
import { LectureService } from "src/app/services/lecture.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
  providers: [UserService, LectureService]
})
export class ChartComponent implements OnInit {
  private totalUsers;
  private totalLectures;

  constructor(
    private _userService: UserService,
    private _lectureService: LectureService
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

  ngOnInit(): void {
    this.getAllResources();
  }

  private getAllResources() {
    this.getTotalUsers();
    this.getTotalLectures();
  }

  private getTotalUsers() {
    this._userService.getUsers().subscribe((response) => {
      this.totalUsers = response.total;
      this.pieChartLabels.push("Usuários");
      this.pieChartData.push(this.totalUsers);
    });
  }

  private getTotalLectures() {
    this._lectureService.getLectures().subscribe((response) => {
      this.totalLectures = response.total;
      this.pieChartLabels.push("Palestras");
      this.pieChartData.push(this.totalLectures);
    });
  }
}
