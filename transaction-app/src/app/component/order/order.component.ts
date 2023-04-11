import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Order} from "../../model/order";
import {OrderedMeal} from "../../model/orderedMeal";
import {TransactionService} from "../../service/transaction.service";
import {Meal} from "../../model/meal";
import {Transaction} from "../../model/transaction";
import {TransactionForm} from "../../model/transactionForm";
declare var window: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders!: Order[];
  transactionFinalizationModal: any;
  transactionCancellationModal: any;
  orderModal: any;
  orderedMeals: OrderedMeal[] = [];
  orderId!: number;

  transactionFinalizationForm = this.formBuilder.group({
    comment: '',
    status: 'FINALIZED'
  });

  transactionCancellationForm = this.formBuilder.group({
    cancelComment: '',
    status: 'CANCELLED'
  });

  constructor(private transactionService: TransactionService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getOrders();
    this.orderModal = new window.bootstrap.Modal(
      document.getElementById('orderModal')
    );
    this.transactionFinalizationModal = new window.bootstrap.Modal(
      document.getElementById('transactionFinalizationModal')
    );
    this.transactionCancellationModal = new window.bootstrap.Modal(
      document.getElementById('transactionCancellationModal')
    );
  }

  getOrders() {
    this.transactionService.getOrders().subscribe(data => {
      this.orders = data;
    })
  }

  openOrderModal(id: number | null | undefined) {
    if (id) {
      this.getOrderMeals(id);
    }
    this.orderModal.show();
  }

  onTransactionFinalizationFormSubmit(): void {
    this.finalizeTransaction({
      "comment": this.transactionFinalizationForm.value.comment,
      "status": this.transactionFinalizationForm.value.status,
      "orderId": this.orderId
    });
    this.transactionFinalizationForm.reset();
    this.closeTransactionFinalizationModal();
    this.getOrders();
  }

  onTransactionCancellationFormSubmit(): void {
    this.finalizeTransaction({
      "comment": this.transactionCancellationForm.value.cancelComment,
      "status": this.transactionCancellationForm.value.status,
      "orderId": this.orderId
    });
    this.transactionCancellationForm.reset();
    this.closeTransactionCancellationModal();
    this.getOrders();
  }

  finalizeTransaction(transaction: TransactionForm) {
    this.transactionService.addTransaction(transaction).subscribe(data => {
    });
  }

  openTransactionFinalizationModal(id: number | null | undefined) {
    if (id) {
      this.orderId = id;
    }
    this.transactionFinalizationModal.show();
  }

  closeTransactionFinalizationModal() {
    this.transactionFinalizationModal.hide();
  }

  openTransactionCancellationModal(id: number | null | undefined) {
    if (id) {
      this.orderId = id;
    }
    this.transactionCancellationModal.show();
  }

  closeTransactionCancellationModal() {
    this.transactionCancellationModal.hide();
  }

  getOrderMeals(id: number | null | undefined): Meal[] {
    if (id) {
      this.transactionService.getOrder(id).subscribe(order => {
        if (order.meals) {
          this.orderedMeals = order.meals;
        }
      })
    }
    return [];
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

