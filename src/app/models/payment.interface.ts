export interface Payment {
  categoryCode: string;
  dates: PaymentDate;
  transaction: PaymentData;
  merchant: Merchant;
  parsedAmount?: number;
  amountWithSign?: number;
  transcribedMerchantName?: string;
  useDefaultIcon?: boolean;
}
export interface PaymentDate {
  valueDate: number | string; // it's messy...
}
export interface PaymentData {
  amountCurrency: AmountCurrency;
  type: string;
  creditDebitIndicator?: string | null; // and this is messy...
}
export interface AmountCurrency {
  amount: number | string; // this is also messy...
  currencyCode: string;
}
export interface Merchant {
  name: string;
  accountNumber?: string; // ? for the purpose of adding new payments to the list
}
