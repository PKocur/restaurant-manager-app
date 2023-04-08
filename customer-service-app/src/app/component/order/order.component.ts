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
  addedMeals: Map<Meal, number> = new Map<Meal, number>();
  addOrderModal: any;
  orderModal: any;
  orderedMeals!: OrderedMeal[];

  addOrderForm = this.formBuilder.group({
    name: '',
    price: ''
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
    this.customerServiceManager.getOrders().subscribe(data => {
      this.orders = data;
    })
  }

  openOrderModal(id: number | null | undefined) {
    if (id) {
      this.getOrderMeals(id);
    }
    this.orderModal.show();
  }

  onAddOrderFormSubmit(order: Partial<Order>): void {
    this.addOrderForm.reset();
  }


  openAddOrderModal() {
    this.addOrderModal.show();
  }

  clearAddOrderModal() {
    this.addedMeals.clear();
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
        const mealFromMap = Array.from(this.addedMeals.keys()).find(m => m.id === meal.id);
        if (mealFromMap) {
          const quantity = this.addedMeals.get(mealFromMap) || 0;
          this.addedMeals.set(mealFromMap, quantity + 1);
        } else {
          this.addedMeals.set(meal, 1);
        }
      })
    }
  }

  removeMeal(id: number | null | undefined) {
    if (id) {
      const mealFromMap = Array.from(this.addedMeals.keys()).find(m => m.id === id);
      if (mealFromMap) {
        const quantity = this.addedMeals.get(mealFromMap) || 0;
        if (quantity > 1) {
          this.addedMeals.set(mealFromMap, quantity - 1);
        } else {
          this.addedMeals.delete(mealFromMap);
        }
      }
    }
  }

  getTotalCost(): string {
    let totalCost: number = 0;
    this.addedMeals.forEach((quantity, meal) => {
      if (meal.price) {
        totalCost += meal.price * quantity;
      }
    });
    return totalCost.toFixed(2);
  }
}

