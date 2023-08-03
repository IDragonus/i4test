import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MealsService } from 'src/app/services/meals.service';
import {
  Category,
  CategoriesApiResponse,
  MealApiResponse,
  Meal,
} from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  person: any;
  category: Category[] | null = null;
  categorySended!: string;
  searchMealResult: string = '';
  response!: string;

  ngOnInit() {
    this.obtenerLocalstorage();
    this.getMealByCategory();
  }

  constructor(private router: Router, private mealsService: MealsService) {}

  obtenerLocalstorage() {
    this.person = JSON.parse(localStorage.getItem('persona') || '{}');
  }

  logOut() {
    localStorage.removeItem('persona');
    this.person = {};
    this.router.navigate(['/login']);
  }

  getMealByCategory(): void {
    this.mealsService.getAllCategories().subscribe({
      next: (data: CategoriesApiResponse) => {
        this.category = data.categories || null;
      },
      error: (error) => {
        console.error('Error fetching meal categories', error);
      },
    });
  }

  selectedCategory(category: string) {
    this.categorySended = category;
  }

  searched(value: string) {
    this.response = value;
  }
}
