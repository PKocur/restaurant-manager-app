import {Component, OnInit} from '@angular/core';
import {Information} from "../../model/information";
import {OrdersCount} from "../../model/ordersCount";
import {MainPanelService} from "../../service/main-panel.service";
import {FormBuilder} from "@angular/forms";
import {AnalyticsService} from "../../service/analytics.service";
import {TotalIncome} from "../../model/totalIncome";
import {QuantitiesPerMeals} from "../../model/QuantitiesPerMeals";
import Chart from 'chart.js/auto';

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

  constructor(private analyticsService: AnalyticsService) {
  }

  ngOnInit(): void {
    this.getOrdersCount()
    this.getTotalIncome()
    this.getQuantitiesPerMeals()
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
}
