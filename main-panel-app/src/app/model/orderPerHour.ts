import {QuantityPerMeal} from "./QuantityPerMeal";

export interface OrderPerHour {
  startHour: string | null | undefined;
  endHour: string | null | undefined;
  orderCount: number | null | undefined;
}
