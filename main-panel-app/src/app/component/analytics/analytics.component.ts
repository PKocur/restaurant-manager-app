import {Component, OnInit} from '@angular/core';
import {Information} from "../../model/information";
import {OrdersCount} from "../../model/ordersCount";
import {MainPanelService} from "../../service/main-panel.service";
import {FormBuilder} from "@angular/forms";
import {AnalyticsService} from "../../service/analytics.service";
import {TotalIncome} from "../../model/totalIncome";
import {QuantitiesPerMeals} from "../../model/QuantitiesPerMeals";
import Chart from 'chart.js/auto';
import {TransactionsStatuses} from "../../model/transactionsStatuses";
import {OrdersPerHours} from "../../model/ordersPerHours";

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  ordersCount!: OrdersCount;
  totalIncome!: TotalIncome;
  quantitiesPerMeals!: QuantitiesPerMeals;
  quantitiesPerMealsChart: any;
  transactionsStatuses!: TransactionsStatuses;
  transactionsStatusesChart: any;
  ordersPerHours!: OrdersPerHours;
  ordersPerHoursChart: any;

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.getOrdersCount()
    this.getTotalIncome()
    this.getQuantitiesPerMeals()
    this.getTransactionsStatuses()
    this.getOrdersPerHours()
  }

  getOrdersCount() {
    this.analyticsService.getOrdersCount().subscribe(data => {
      this.ordersCount = data;
    })
  }

  getTotalIncome() {
    this.analyticsService.getTotalIncome().subscribe(data => {
      this.totalIncome = data;
    })
  }

  getQuantitiesPerMeals() {
    this.analyticsService.getQuantitiesPerMeals().subscribe(data => {
      this.quantitiesPerMeals = data;
      this.createQuantitiesPerMealsChart();
    })
  }

  getTransactionsStatuses() {
    this.analyticsService.getTransactionsStatuses().subscribe(data => {
      this.transactionsStatuses = data;
      this.createTransactionsStatusesChart();
    })
  }

  getOrdersPerHours() {
    this.analyticsService.getOrdersPerHours().subscribe(data => {
      this.ordersPerHours = data;
      this.createOrderPerHoursChart();
    })
  }

  createQuantitiesPerMealsChart() {
    this.quantitiesPerMealsChart = new Chart("quantitiesPerMealsChart", {
      type: 'bar',
      data: {
        labels: this.getMealNamesForChart(),
        datasets: [
          {
            label: "Sold",
            data: this.getQuantitiesForChart(),
            backgroundColor: 'blue'
          }
        ]
      }
    });
  }

  getMealNamesForChart() {
    return this.quantitiesPerMeals.quantityPerMealList.map(quantityPerMeal => quantityPerMeal.mealName);
  }

  getQuantitiesForChart() {
    return this.quantitiesPerMeals.quantityPerMealList.map(quantityPerMeal => quantityPerMeal.quantity);
  }

  createTransactionsStatusesChart() {
    this.quantitiesPerMealsChart = new Chart("transactionsStatusesChart", {
      type: 'pie',
      data: {
        labels: this.getTransactionStatusesNamesForChart(),
        datasets: [
          {
            label: "Finished",
            data: this.getTransactionsCountForChart(),
            backgroundColor: [
              'green',
              'red',
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  getTransactionStatusesNamesForChart() {
    return ['Finalized', 'Cancelled'];
  }

  getTransactionsCountForChart() {
    return [this.transactionsStatuses.finalized, this.transactionsStatuses.cancelled]
  }

  createOrderPerHoursChart() {
    this.quantitiesPerMealsChart = new Chart("orderPerHoursChart", {
      type: 'line',
      data: {
        labels: this.getDatesForChart(),
        datasets: [
          {
            label: "Number of orders",
            data: this.getOrdersCountForChart(),
            backgroundColor: 'pink'
          }
        ]
      }
    });
  }

  getDatesForChart() {
    return this.ordersPerHours.orderPerHourList.map(orderPerHour => orderPerHour.startHour + "-" + orderPerHour.endHour);
  }

  getOrdersCountForChart() {
    return this.ordersPerHours.orderPerHourList.map(orderPerHour => orderPerHour.orderCount);
  }
}
