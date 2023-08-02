export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  rating?: number;
}

export interface MealApiResponse {
  meals: Meal[];
}
