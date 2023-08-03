import { Component, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Meal, MealApiResponse } from 'src/app/interfaces/interfaces';
import { MealsService } from 'src/app/services/meals.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  meals!: Meal[];
  @Input() set categorySended(value: string) {
    this.showMealsByCategory(value);
  }

  @Input() set mealSearched(value: string) {
    this.onSearch(value);
    console.log('valor en el homepage: ', value);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  allMeals!: Observable<Meal[]>;
  dataSource!: MatTableDataSource<Meal>;

  constructor(
    private mealsService: MealsService,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.canadianMealsList();
  }

  paginatorMeals() {
    this.dataSource = new MatTableDataSource<Meal>(this.meals);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.allMeals = this.dataSource.connect();
  }

  canadianMealsList(): void {
    this.mealsService.getCanadianMeals().subscribe({
      next: (data: MealApiResponse) => {
        this.meals = data.meals.map((meal: Meal) => ({
          ...meal,
          rating: Math.floor(Math.random() * 5) + 1,
        }));
        this.paginatorMeals();
      },
      error: (error) => {
        console.error('Error fetching Canadian meals', error);
      },
    });
  }

  getStarsArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, index) => index + 1);
  }

  showMealsByCategory(category: string): void {
    this.mealsService.getMealsByCategory(category).subscribe((data) => {
      this.meals = data.meals;
      this.paginatorMeals();
    });
  }

  onSearch(value: string) {
    this.mealsService.serachMeal(value).subscribe((ress: any) => {
      this.meals = ress.meals;
      this.paginatorMeals();
    });
  }

  openModalMeals(idMeal: string) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { id: idMeal },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  onRatingChange(star: number) {
    this.rating = star;
    // Aquí puedes realizar acciones adicionales si es necesario
    // Por ejemplo, guardar la puntuación en una lista de meals.
  }
}
