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
  editMealModal: any;
  editMealId: number | null | undefined = null;

  addMealForm = this.formBuilder.group({
    name: '',
    price: ''
  });

  editMealForm = this.formBuilder.group({
    editName: '',
    editPrice: ''
  });

  constructor(private mainPanelService: MainPanelService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getMeals();
    this.addMealModal = new window.bootstrap.Modal(
      document.getElementById('addMealModal')
    );
    this.editMealModal = new window.bootstrap.Modal(
      document.getElementById('editMealModal')
    );
  }

  onAddMealFormSubmit(): void {
    this.addMeal({
      "name": this.addMealForm.value.name,
      "price": Number(this.addMealForm.value.price)
    });
    this.addMealForm.reset();
  }


  onEditMealFormSubmit(mealId: number | null | undefined) {
    if (!mealId) {
      return
    }
    this.editMeal(mealId, {
      "name": this.editMealForm.value.editName,
      "price": Number(this.editMealForm.value.editPrice)
    });
    this.closeEditMealModal()
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

  editMeal(mealId: number, meal: Partial<Meal>) {
    this.mainPanelService.editMeal(mealId, meal).subscribe(data => {
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

  openEditMealModal(mealId: number | null | undefined) {
    this.editMealId = mealId;
    this.editMealModal.show();
  }

  closeEditMealModal() {
    this.editMealModal.hide();
  }
}
