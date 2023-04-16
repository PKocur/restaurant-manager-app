import {Component, OnInit} from '@angular/core';
import {Information} from "../../model/information";
import {OrdersCount} from "../../model/ordersCount";
import {MainPanelService} from "../../service/main-panel.service";
import {FormBuilder} from "@angular/forms";
import {AnalyticsService} from "../../service/analytics.service";
import {TotalIncome} from "../../model/totalIncome";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  ordersCount!: OrdersCount;
  totalIncome!: TotalIncome;

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.getOrdersCount()
    this.getTotalIncome()
  }

  getOrdersCount() {
    this.analyticsService.getOrdersCount().subscribe(data => {
      this.ordersCount = data;
    })
  }

  getTotalIncome() {
    this.analyticsService.getTotalIncome().subscribe(data => {
      this.totalIncome = data;
      console.log(this.totalIncome)
    })
  }
}
