import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  CategoriesApiResponse,
  MealApiResponse,
} from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MealsService {
  readonly api_url = 'https://themealdb.com/api';

  constructor(private http: HttpClient) {}

  getCanadianMeals(): Observable<MealApiResponse> {
    return this.http
      .get<MealApiResponse>(`${this.api_url}/json/v1/1/filter.php?a=Canadian`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching Canadian meals:', error);
          return throwError(() => 'Network error');
        })
      );
  }

  getAllCategories(): Observable<CategoriesApiResponse> {
    return this.http
      .get<CategoriesApiResponse>(`${this.api_url}/json/v1/1/categories.php`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching meals by category:', error);
          return throwError(() => 'Service error');
        })
      );
  }

  getMealsByCategory(category: string): Observable<MealApiResponse> {
    return this.http
      .get<MealApiResponse>(
        `${this.api_url}/json/v1/1/filter.php?c=${category}`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching meals by category:', error);
          return throwError(() => 'Service error');
        })
      );
  }

  serachMeal(searchMealResult: string): Observable<MealApiResponse> {
    return this.http
      .get<MealApiResponse>(
        `${this.api_url}/json/v1/1/search.php?s=${searchMealResult}`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error searching meal: ', error);
          return throwError(() => 'Service error');
        })
      );
  }

  getMealsById(id: string): Observable<MealApiResponse> {
    return this.http
      .get<MealApiResponse>(`${this.api_url}/json/v1/1/lookup.php?i=${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching meals by category:', error);
          return throwError(() => 'Service error');
        })
      );
  }
}
