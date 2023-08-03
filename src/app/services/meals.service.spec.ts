import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MealsService } from './meals.service';
import { MealApiResponse } from '../interfaces/interfaces';

describe('MealsService', () => {
  let service: MealsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MealsService],
    });
    service = TestBed.inject(MealsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch Canadian meals', () => {
    const mockApiResponse: MealApiResponse = {
      meals: [
        { idMeal: '1', strMeal: 'Poutine', strCategory: 'Canadian' },
        {
          idMeal: '2',
          strMeal: 'Maple Syrup Pancakes',
          strCategory: 'Canadian',
        },
      ],
    };

    service.getCanadianMeals().subscribe((response) => {
      expect(response).toEqual(mockApiResponse);
    });

    const request = httpMock.expectOne(
      `${service.api_url}/json/v1/1/filter.php?a=Canadian`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockApiResponse);
  });

  it('should handle error when fetching Canadian meals', () => {
    const mockError = new ErrorEvent('Network error');
    service.getCanadianMeals().subscribe({
      error: (error) => {
        expect(error).toEqual('Network error');
      },
    });

    const request = httpMock.expectOne(
      `${service.api_url}/json/v1/1/filter.php?a=Canadian`
    );
    expect(request.request.method).toBe('GET');
    request.error(mockError);
  });
});
