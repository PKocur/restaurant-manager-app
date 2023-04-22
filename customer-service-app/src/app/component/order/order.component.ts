import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Order} from "../../model/order";
import {CustomerServiceManager} from "../../service/customer-service-manager.service";
import {Meal} from "../../model/meal";
import {OrderedMeal} from "../../model/orderedMeal";

declare var window: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders!: Order[];
  meals!: Meal[];
  addedMeals: OrderedMeal[] = [];
  addOrderModal: any;
  orderModal: any;
  orderedMeals: OrderedMeal[] = [];

  addOrderForm = this.formBuilder.group({
    recognitionId: ''
  });

  constructor(private customerServiceManager: CustomerServiceManager,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getOrders();
    this.getMeals();
    this.addOrderModal = new window.bootstrap.Modal(
      document.getElementById('addOrderModal')
    );
    this.orderModal = new window.bootstrap.Modal(
      document.getElementById('orderModal')
    );
  }

  getMeals() {
    this.customerServiceManager.getMeals().subscribe(data => {
      this.meals = data;
    })
  }

  getOrders() {
    this.customerServiceManager.getPendingOrders().subscribe(data => {
      this.orders = data;
    })
  }

  openOrderModal(id: number | null | undefined) {
    if (id) {
      this.getOrderMeals(id);
    }
    this.orderModal.show();
  }

  onAddOrderFormSubmit(): void {
    this.addOrder({
      "recognitionId": this.addOrderForm.value.recognitionId,
      "meals": this.addedMeals
    });
    this.addOrderForm.reset();
  }

  addOrder(order: Partial<Order>): void {
    this.customerServiceManager.addOrder(order).subscribe(data => {
      if (data) {
        this.getOrders();
        this.closeAddOrderModal();
      }
    });
  }

  openAddOrderModal() {
    this.addOrderModal.show();
  }

  closeAddOrderModal() {
    this.clearAddOrderModal();
    this.addOrderModal.hide();
  }

  clearAddOrderModal() {
    this.addedMeals = [];
  }

  getOrderMeals(id: number | null | undefined): Meal[] {
    if (id) {
      this.customerServiceManager.getOrder(id).subscribe(order => {
        if (order.meals) {
          this.orderedMeals = order.meals;
        }
      })
    }
    return [];
  }

  addMeal(id: number | null | undefined) {
    if (id) {
      this.customerServiceManager.getMeal(id).subscribe(meal => {
        const mealFromList = this.addedMeals.find(m => m.id === meal.id);
        if (mealFromList && mealFromList.quantity) {
          const index = this.addedMeals.indexOf(mealFromList);
          mealFromList.quantity++;
          this.addedMeals[index] = mealFromList;
        } else {
          this.addedMeals.push({...meal, quantity: 1})
        }
      })
    }
  }

  removeMeal(id: number | null | undefined) {
    if (id) {
      const mealFromList = this.addedMeals.find(m => m.id === id);
      if (mealFromList && mealFromList.quantity) {
        if (mealFromList.quantity > 1) {
          mealFromList.quantity--;
        } else {
          const index = this.addedMeals.indexOf(mealFromList);
          this.addedMeals.splice(index, 1);
        }
      }
    }
  }

  getTotalCostOfAddedMeals(): string {
    let totalCost: number = 0;
    this.addedMeals.forEach(meal => {
      if (meal.price && meal.quantity) {
        totalCost += meal.price * meal.quantity;
      }
    });
    return totalCost.toFixed(2);
  }

  getTotalCostOfOrderedMeals(): string {
    let totalCost: number = 0;
    this.orderedMeals.forEach(meal => {
      if (meal.price && meal.quantity) {
        totalCost += meal.price * meal.quantity;
      }
    });
    return totalCost.toFixed(2);
  }
}

