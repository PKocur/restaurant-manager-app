import {Component, OnInit} from '@angular/core';
import {MainPanelService} from "../../service/main-panel.service";
import {FormBuilder} from "@angular/forms";
import {Information} from "../../model/information";

declare var window: any;

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  information!: Information;
  addInformationModal: any;
  editInformationModal: any;

  editInformationForm = this.formBuilder.group({
    name: '',
    state: '',
    city: '',
    street: '',
    streetNumber: '',
  });

  addInformationForm = this.formBuilder.group({
    addName: '',
    addState: '',
    addCity: '',
    addStreet: '',
    addStreetNumber: '',
  });

  constructor(private mainPanelService: MainPanelService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getInformation()
    this.addInformationModal = new window.bootstrap.Modal(
      document.getElementById('addInformationModal')
    );
    this.editInformationModal = new window.bootstrap.Modal(
      document.getElementById('editInformationModal')
    );
  }

  getInformation() {
    this.mainPanelService.getInformation().subscribe(data => {
      this.information = data;
    })
  }

  onAddInformationFormSubmit(): void {
    this.addInformation({
      "name": this.addInformationForm.value.addName,
      "state": this.addInformationForm.value.addState,
      "city": this.addInformationForm.value.addCity,
      "street": this.addInformationForm.value.addStreet,
      "streetNumber": Number(this.addInformationForm.value.addStreetNumber)
    });
    this.closeAddInformationModal()
  }

  onEditInformationFormSubmit(): void {
    this.editInformation({
      "name": this.editInformationForm.value.name,
      "state": this.editInformationForm.value.state,
      "city": this.editInformationForm.value.city,
      "street": this.editInformationForm.value.street,
      "streetNumber": Number(this.editInformationForm.value.streetNumber)
    });
    this.closeEditInformationModal()
  }

  addInformation(information: Partial<Information>) {
    this.mainPanelService.addInformation(information).subscribe(data => {
      if (data) {
        this.getInformation();
      }
    });
  }

  editInformation(information: Partial<Information>) {
    this.mainPanelService.editInformation(information).subscribe(data => {
      if (data) {
        this.getInformation();
      }
    });
  }

  openAddInformationModal() {
    this.addInformationModal.show();
  }

  closeAddInformationModal() {
    this.addInformationModal.hide();
  }

  openEditInformationModal() {
    this.editInformationModal.show();
  }

  closeEditInformationModal() {
    this.editInformationModal.hide();
  }

}
