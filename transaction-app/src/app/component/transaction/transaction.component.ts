import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../service/transaction.service";
import {Transaction} from "../../model/transaction";
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
    })
  }

  openTransactionModal(id: number | null | undefined) {
    if (id) {
      this.getTransaction(id);
    }
    this.transactionModal.show();
  }
}

