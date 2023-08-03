export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  rating?: number;
}

export interface MealApiResponse {
  meals: Meal[];
}

export interface Category {
  idCategory: number;
  strCategory: string;
  strCategoryDescription: string;
  strCategoryThumb: string;
}

export interface CategoriesApiResponse {
  categories: Category[];
}
