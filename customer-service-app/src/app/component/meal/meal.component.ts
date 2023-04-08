import {Component, OnInit} from '@angular/core';
import {CustomerServiceManager} from "../../service/customer-service-manager.service";
import {Meal} from "../../model/meal";

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {
  meals!: Meal[];

  constructor(private customerServiceManager: CustomerServiceManager) {
  }

  ngOnInit(): void {
    this.getMeals();
  }


  getMeals() {
    this.customerServiceManager.getMeals().subscribe(data => {
      this.meals = data;
    })
  }
}

