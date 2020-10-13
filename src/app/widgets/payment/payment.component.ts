import { Component, OnInit, OnDestroy } from '@angular/core';

import { PaymentService } from '../../services/payment.service';
import {Payment} from '../../models/payment.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  currentList: Payment[];
  currentStep = 'makeTransfer';
  isSubmitted = false;
  accountBalance = 5000;
  paymentData = {
    amount: null,
    recipientName: ''
  };

  constructor(private paymentService: PaymentService) { }

  clearForm(): void {
    this.isSubmitted = false;
    this.paymentData = {
      amount: null,
      recipientName: ''
    };
  }

  onSubmit(formData): void {
    this.isSubmitted = true;
    this.paymentData = formData.value;
    if (!formData.valid) {
      return;
    }
    this.currentStep = 'confirmationScreen';
  }

  makePayment(): void {
    const payment = {
      categoryCode: '#008000',
      dates: {
        valueDate: (new Date()).getTime()
      },
      transaction: {
        amountCurrency: {
          amount: this.paymentData.amount,
          currencyCode: 'EUR'
        },
        type: 'Money Transfer',
        creditDebitIndicator: 'DBIT'
      },
      merchant: {
        name: this.paymentData.recipientName
      },
      useDefaultIcon: true
    };
    this.accountBalance -= this.paymentData.amount;
    const newPaymentsList = this.currentList.concat(payment);
    this.paymentService.next(newPaymentsList);
    this.clearForm();
    this.currentStep = 'makeTransfer';
  }

  ngOnInit(): void {
    this.clearForm();
    this.subscription.add(this.paymentService.paymentsList$.subscribe((payments: Payment[]) => {
      this.currentList = payments;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
