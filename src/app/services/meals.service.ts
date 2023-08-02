import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MealApiResponse } from '../interfaces/meals.interfaces';

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
}
