import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MealsService } from './meals.service';
import {
  CategoriesApiResponse,
  MealApiResponse,
} from '../interfaces/interfaces';

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
        {
          idMeal: '1',
          strMeal: 'Poutine',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg',
        },
        {
          idMeal: '2',
          strMeal: 'Maple Syrup Pancakes',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/1550441882.jpg',
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

  it('Should fetch all categories', () => {
    const mockApiResponse: CategoriesApiResponse = {
      categories: [
        {
          idCategory: 1,
          strCategory: 'Beef',
          strCategoryDescription:
            'Beef is the culinary name for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times.[1] Beef is a source of high-quality protein and essential nutrients.[2]',
          strCategoryThumb:
            'https://www.themealdb.com/images/category/beef.png',
        },
      ],
    };
    service.getAllCategories().subscribe((response) => {
      expect(response).toEqual(mockApiResponse);
    });

    const request = httpMock.expectOne(
      `${service.api_url}/json/v1/1/categories.php`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockApiResponse);
  });

  it('should handle error when fetching categories', () => {
    const mockError = new ErrorEvent('Service error');
    service.getAllCategories().subscribe({
      error: (error) => {
        expect(error).toEqual('Service error');
      },
    });
    const request = httpMock.expectOne(
      `${service.api_url}/json/v1/1/categories.php`
    );
    expect(request.request.method).toBe('GET');
    request.error(mockError);
  });

  it('should fetch meals by category', () => {
    const category = 'Beef';
    const mockApiResponse: MealApiResponse = {
      meals: [
        {
          idMeal: '1',
          strMeal: 'Beef Stroganoff',
          strMealThumb: 'https://www.themealdb.com/images/category/beef.png',
        },
        {
          idMeal: '2',
          strMeal: 'Beef and Broccoli',
          strMealThumb: 'https://www.themealdb.com/images/category/chicken.png',
        },
      ],
    };

    service.getMealsByCategory(category).subscribe((response) => {
      expect(response).toEqual(mockApiResponse);
    });

    const request = httpMock.expectOne(
      `${service.api_url}/json/v1/1/filter.php?c=${category}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockApiResponse);
  });

  it('should search for a meal', () => {
    const searchQuery = 'Pasta';
    const mockApiResponse: MealApiResponse = {
      meals: [
        {
          idMeal: '1',
          strMeal: 'Poutine',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg',
        },
        {
          idMeal: '2',
          strMeal: 'Maple Syrup Pancakes',
          strMealThumb:
            'https://www.themealdb.com/images/media/meals/1550441882.jpg',
        },
      ],
    };

    service.serachMeal(searchQuery).subscribe((response) => {
      expect(response).toEqual(mockApiResponse);
    });

    const request = httpMock.expectOne(
      `${service.api_url}/json/v1/1/search.php?s=${searchQuery}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockApiResponse);
  });

  it('should handle error when searching for a meal', () => {
    const searchQuery = 'NonExistingMeal';
    const mockError = new ErrorEvent('Service error');
    service.serachMeal(searchQuery).subscribe({
      error: (error) => {
        expect(error).toEqual('Service error');
      },
    });

    const request = httpMock.expectOne(
      `${service.api_url}/json/v1/1/search.php?s=${searchQuery}`
    );
    expect(request.request.method).toBe('GET');
    request.error(mockError);
  });

  it('should fetch a meal by ID', () => {
    const mealId = '123';
    const mockApiResponse: MealApiResponse = {
      meals: [
        {
          idMeal: '1',
          strMeal: 'Beef Stroganoff',
          strMealThumb: 'https://www.themealdb.com/images/category/beef.png',
        },
        {
          idMeal: '2',
          strMeal: 'Beef and Broccoli',
          strMealThumb: 'https://www.themealdb.com/images/category/chicken.png',
        },
      ],
    };

    service.getMealsById(mealId).subscribe((response) => {
      expect(response).toEqual(mockApiResponse);
    });

    const request = httpMock.expectOne(
      `${service.api_url}/json/v1/1/lookup.php?i=${mealId}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockApiResponse);
  });

  it('should handle error when fetching a meal by ID', () => {
    const mealId = '999';
    const mockError = new ErrorEvent('Service error');
    service.getMealsById(mealId).subscribe({
      error: (error) => {
        expect(error).toEqual('Service error');
      },
    });

    const request = httpMock.expectOne(
      `${service.api_url}/json/v1/1/lookup.php?i=${mealId}`
    );
    expect(request.request.method).toBe('GET');
    request.error(mockError);
  });
});
