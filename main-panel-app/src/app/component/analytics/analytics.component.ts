import {Component, OnInit} from '@angular/core';
import {Information} from "../../model/information";
import {OrdersCount} from "../../model/ordersCount";
import {MainPanelService} from "../../service/main-panel.service";
import {FormBuilder} from "@angular/forms";
import {AnalyticsService} from "../../service/analytics.service";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  ordersCount!: OrdersCount;


  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.getOrdersCount()
  }

  getOrdersCount() {
    this.analyticsService.getOrdersCount().subscribe(data => {
      this.ordersCount = data;
    })
  }
}
