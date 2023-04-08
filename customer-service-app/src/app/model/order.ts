import {Meal} from "./meal";
import {OrderedMeal} from "./orderedMeal";

export interface Order {
  id: number | null | undefined;
  recognitionId: string | null | undefined;
  meals: OrderedMeal[] | null | undefined;
}
