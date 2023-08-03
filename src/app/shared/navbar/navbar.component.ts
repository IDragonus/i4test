import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MealsService } from 'src/app/services/meals.service';
import { Category, CategoriesApiResponse } from 'src/app/interfaces/interfaces';
import { LiveAnnouncer } from '@angular/cdk/a11y';

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
  searchMade: string[] = [];
  announcer = inject(LiveAnnouncer);

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
    const MAX_SEARCH_HISTORY_LENGTH = 11;
    this.response = value;
    this.searchMade.push(value);
    if (this.searchMade.length === MAX_SEARCH_HISTORY_LENGTH) {
      this.searchMade.shift();
    }
  }

  remove(fruit: string): void {
    const index = this.searchMade.indexOf(fruit);

    if (index >= 0) {
      this.searchMade.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }
}
