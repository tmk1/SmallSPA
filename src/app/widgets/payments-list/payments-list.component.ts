import {Component, OnDestroy, OnInit} from '@angular/core';

import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../models/payment.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.css']
})
export class PaymentsListComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  curatedList: Payment[];
  sortingOption = 'date';
  sortingAsc = true;
  searchInput = '';

  constructor(private paymentService: PaymentService) { }

  curatePaymentsList(payments: Payment[]): Payment[] {
    // If the data would be complete - I would do all operations within one .map or not curate data at all in this manner
    // I believe that this kind of messy data would not be accepted in a real bank institution
   return payments
     .map(payment => {
       if (typeof (payment.transaction.amountCurrency.amount) === 'string') {
         return {
           ...payment,
           parsedAmount: parseFloat(payment.transaction.amountCurrency.amount),
         };
       } else {
           return {
             ...payment,
             parsedAmount: payment.transaction.amountCurrency.amount,
           };
       }
     })
     .map(payment => {
       if (payment.transaction?.creditDebitIndicator) {
         if (payment.transaction.creditDebitIndicator === 'DBIT') {
           return {
             ...payment,
             amountWithSign: payment.parsedAmount * (-1),
           };
         } else {
           return {
             ...payment,
             amountWithSign: payment.parsedAmount,
           };
         }
       } else {
         return {
           ...payment,
           amountWithSign: payment.parsedAmount * -1,
         };
       }
     })
     .map(payment => {
       if (payment?.useDefaultIcon) {
        return payment;
       }
       return {
         ...payment,
         transcribedMerchantName: payment.merchant.name.toLowerCase().replace(/\s/g, '')
       };
     });
  }

  compareValues(key, orderAsc = this.sortingAsc): any {
    return function innerSort(a, b): number {
      let itemA = null;
      let itemB = null;
      if (key === 'date') {
        itemA = (new Date(a.dates.valueDate)).getTime();
        itemB = (new Date(b.dates.valueDate)).getTime();
      } else if (key === 'beneficiary') {
        itemA = a.merchant.name;
        itemB = b.merchant.name;
      } else if (key === 'amount') {
        itemA = a.amountWithSign;
        itemB = b.amountWithSign;
      }
      const varA = (typeof itemA === 'string')
        ? itemA.toUpperCase() : itemA;
      const varB = (typeof itemB === 'string')
        ? itemB.toUpperCase() : itemB;

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return orderAsc ? comparison : (comparison * -1);
    };
  }

  sortList(key: string): void {
    if (this.sortingOption === key) {
      this.sortingAsc = !this.sortingAsc;
    }
    this.sortingOption = key;
    this.curatedList.sort(this.compareValues(key));
  }

  getCategoryCode(paymentData): string {
    return paymentData.categoryCode;
  }

  ngOnInit(): void {
    this.subscription.add(this.paymentService.paymentsList$.subscribe((payments: Payment[]) => {
      this.curatedList = this.curatePaymentsList(payments);
      this.sortingAsc = true;
      this.sortList('date');
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
