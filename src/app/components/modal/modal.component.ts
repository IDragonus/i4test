import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Meal } from 'src/app/interfaces/interfaces';
import { MealsService } from 'src/app/services/meals.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  meals!: Meal[];

  constructor(
    private mealsService: MealsService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log('data', this.data);
    this.getMealsById(this.data);
  }

  getMealsById(data: any) {
    let id = data.id;
    this.mealsService.getMealsById(id).subscribe((data) => {
      this.meals = data.meals;
      console.log('modal', this.meals[0].strMealThumb);
    });
  }
}
