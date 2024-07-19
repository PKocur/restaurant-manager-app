import {Order} from "./order";

export interface TransactionForm {
  status: string | null | undefined;
  comment: string | null | undefined;
  orderId: number | null | undefined;
}
