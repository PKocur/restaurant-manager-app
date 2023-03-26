import {Component, OnInit} from '@angular/core';
import {Meal} from "../../model/meal";
import {FormBuilder} from '@angular/forms';
import {MainPanelService} from "../../service/main-panel.service";
declare var window: any;

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
  meals!: Meal[];
  addMealModal: any;

  checkoutForm = this.formBuilder.group({
    name: '',
    price: ''
  });

  constructor(private mainPanelService: MainPanelService,
              private formBuilder: FormBuilder) {
  }

  onSubmit(): void {
    this.addMeal({
      "name": this.checkoutForm.value.name,
      "price": Number(this.checkoutForm.value.price)
    });
    this.checkoutForm.reset();
  }


  ngOnInit() {
    this.getMeals();
    this.addMealModal = new window.bootstrap.Modal(
      document.getElementById('addMealModal')
    );
  }

  getMeals() {
    this.mainPanelService.getMeals().subscribe(data => {
      this.meals = data;
    })
  }

  addMeal(meal: Partial<Meal>) {
    this.mainPanelService.addMeal(meal).subscribe(data => {
      if (data) {
        this.getMeals();
      }
    });
  }

  removeMeal(id: number | undefined | null) {
    if (id) {
      this.mainPanelService.removeMeal(id).subscribe(data => {
        if (data) {
          this.getMeals();
        }
      });
    }
  }

  openAddMealModal() {
    this.addMealModal.show();
  }

  closeAddMealModal() {
    this.addMealModal.hide();
  }
}
