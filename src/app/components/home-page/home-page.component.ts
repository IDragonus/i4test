import { Component, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Meal, MealApiResponse } from 'src/app/interfaces/interfaces';
import { MealsService } from 'src/app/services/meals.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  meals!: Meal[];
  @Input() set categorySended(value: string) {
    this.showMealsByCategory(value);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  allMeals!: Observable<Meal[]>;
  dataSource!: MatTableDataSource<Meal>;

  constructor(
    private mealsService: MealsService,
    private changeDetectorRef: ChangeDetectorRef
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
}
