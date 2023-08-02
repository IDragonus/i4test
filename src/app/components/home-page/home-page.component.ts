import { Component } from '@angular/core';
import { Meal, MealApiResponse } from 'src/app/interfaces/meals.interfaces';
import { MealsService } from 'src/app/services/meals.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  meals: Meal[] | null = null;
  constructor(private mealsService: MealsService) {}

  ngOnInit() {
    this.canadianMealsList();
  }

  canadianMealsList(): void {
    this.mealsService.getCanadianMeals().subscribe({
      next: (data: MealApiResponse) => {
        this.meals = data.meals || null;
        console.log(this.meals);
      },
      error: (error) => {
        console.error('Error fetching Canadian meals', error);
      },
    });
  }

  getStarsArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, index) => index + 1);
  }
}
