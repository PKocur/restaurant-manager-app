import {Order} from "./order";

export interface Transaction {
  id: number | null | undefined;
  status: string | null | undefined;
  comment: string | null | undefined;
  order: Order | null | undefined;
  date: string | null | undefined;
}
