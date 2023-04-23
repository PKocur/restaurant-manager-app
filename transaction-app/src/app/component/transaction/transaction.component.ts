import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../service/transaction.service";
import {Transaction} from "../../model/transaction";
import {OrderedMeal} from "../../model/orderedMeal";
import {DateUtil} from "../../common/DateUtil";
declare var window: any;


@Component({
  selector: 'app-meal',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions!: Transaction[];
  transaction!: Transaction;
  transactionModal: any;
  orderedMeals: OrderedMeal[] = [];

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.getTransactions();
    this.transactionModal = new window.bootstrap.Modal(
      document.getElementById('transactionModal')
    );
  }

  getTransactions() {
    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;
    })
  }

  getTransaction(id: number) {
    this.transactionService.getTransaction(id).subscribe(data => {
      this.transaction = data;
      if (data.order?.meals) {
        this.orderedMeals = data.order.meals;
      }
    })
  }

  openTransactionModal(id: number | null | undefined) {
    if (id) {
      this.getTransaction(id);
    }
    this.transactionModal.show();
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

  getDate(date: string): string {
    return DateUtil.getFormattedDate(date);
  }
}

