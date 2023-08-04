import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MealsService } from 'src/app/services/meals.service';
import {
  Category,
  CategoriesApiResponse,
  Admin,
} from 'src/app/interfaces/interfaces';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

const MAX_SEARCH_HISTORY_LENGTH = 11;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  category: Category[] | null = null;
  private subscription: Subscription | undefined;
  categorySended!: string;
  searchMealResult: string = '';
  response!: string;
  searchMade: string[] = [];

  ngOnInit() {
    this.getUserLocalStorage();
    this.getMealByCategory();
  }

  constructor(
    private router: Router,
    private mealsService: MealsService,
    private snackBar: MatSnackBar,
    private announcer: LiveAnnouncer
  ) {
    this.getMealByCategory();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getUserLocalStorage(): Admin {
    try {
      const userData = localStorage.getItem('persona');
      if (userData) {
        const admin: Admin = JSON.parse(userData);
        return admin;
      } else {
        return {} as Admin;
      }
    } catch (error) {
      console.error('Error getting local storage user data', error);
      return {} as Admin;
    }
  }

  logOut(): void {
    this.clearLocalStorage();
    const navigationExtras: NavigationExtras = {
      queryParams: { animation: 'logout' },
    };
    this.router.navigate(['/login'], navigationExtras);
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('persona');
  }

  getMealByCategory(): void {
    this.subscription = this.mealsService.getAllCategories().subscribe({
      next: (data: CategoriesApiResponse) => {
        this.category = data.categories || null;
      },
      error: (error) => {
        this.snackBar.open('Error fetching categories', 'close', {
          duration: 5000,
        });
        console.error('Error fetching categories', error);
      },
    });
  }

  selectedCategory(category: string): void {
    if (this.categorySended !== category) {
      this.categorySended = category;
    }
  }

  searched(value: string) {
    if (value.trim() !== '') {
      this.response = value;
      this.searchMade.push(value);
      if (this.searchMade.length > MAX_SEARCH_HISTORY_LENGTH) {
        this.searchMade.shift();
      }
    }
  }

  remove(fruit: string): void {
    const index = this.searchMade.indexOf(fruit);

    if (index >= 0) {
      this.searchMade = this.searchMade.filter((item) => item !== fruit);

      this.announceRemoval(fruit);
    }
  }

  announceRemoval(fruit: string): void {
    this.announcer.announce(`Removed ${fruit}`);
  }
}
