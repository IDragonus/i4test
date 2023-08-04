// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { Meal } from 'src/app/interfaces/interfaces';
// import { MealsService } from 'src/app/services/meals.service';

// @Component({
//   selector: 'app-modal',
//   templateUrl: './modal.component.html',
//   styleUrls: ['./modal.component.css'],
// })
// export class ModalComponent {
//   meals!: Meal[];

//   constructor(
//     private mealsService: MealsService,
//     public dialogRef: MatDialogRef<ModalComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {}

//   ngOnInit() {
//     this.getMealsById(this.data);
//   }

//   getMealsById(data: any) {
//     let id = data.id;
//     this.mealsService.getMealsById(id).subscribe((data) => {
//       this.meals = data.meals;
//     });
//   }
// }

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Meal } from 'src/app/interfaces/interfaces';
import { MealsService } from 'src/app/services/meals.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  meals: Meal[] = [];

  constructor(
    private mealsService: MealsService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}

  ngOnInit() {
    this.getMealsById(this.data.id);
  }

  getMealsById(id: string) {
    this.mealsService.getMealsById(id).subscribe({
      next: (data) => {
        this.meals = data.meals;
      },
      error: (error) => {
        console.error('Error fetching meals by id:', error);
      },
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
