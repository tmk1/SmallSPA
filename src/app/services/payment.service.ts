import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Payment } from '../models/payment.interface';
// @ts-ignore
import initialPaymentsList from '../../assets/transactions.json';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  constructor() {}

  private source = new BehaviorSubject<Payment[]>(initialPaymentsList.data);
  paymentsList$ = this.source.asObservable();

  next(payment: Payment[]): void {
    this.source.next(payment);
  }
}
