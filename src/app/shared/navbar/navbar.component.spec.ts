import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';

import { NavbarComponent } from './navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Admin, Category } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatChipsModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatListModule,
        MatDialogModule,
        MatPaginatorModule,
        MatInputModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatPaginatorModule,
        MatChipsModule,
        MatDialogModule,
        MatSnackBarModule,
        FormsModule,
        RouterTestingModule,
      ],
      declarations: [NavbarComponent, HomePageComponent],
      providers: [],
    });

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return user data from localStorage if available', () => {
    const userData: Admin = { username: 'test', password: 'test' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(userData));

    const result = component.getUserLocalStorage();

    expect(localStorage.getItem).toHaveBeenCalledWith('persona');
    expect(result).toEqual(userData);
  });

  it('should return an empty Admin object if no user data in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = component.getUserLocalStorage();

    expect(localStorage.getItem).toHaveBeenCalledWith('persona');
    expect(result).toEqual({} as Admin);
  });

  it('should handle errors in localStorage retrieval', () => {
    spyOn(localStorage, 'getItem').and.throwError('localStorage error');

    const result = component.getUserLocalStorage();

    expect(localStorage.getItem).toHaveBeenCalledWith('persona');
    expect(result).toEqual({} as Admin);
  });

  it('should clear local storage and navigate to /login with animation query param', () => {
    const clearLocalStorageSpy = spyOn(component, 'clearLocalStorage');
    const navigateSpy = spyOn(router, 'navigate');

    component.logOut();

    expect(clearLocalStorageSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/login'], {
      queryParams: { animation: 'logout' },
    });
  });

  it('should remove the meal from searchMade and call announceRemoval', () => {
    const mealToRemove = 'Meal 1';
    component.searchMade = ['Meal 1', 'Meal 2', 'Meal 3'];

    component.remove(mealToRemove);

    expect(component.searchMade).toEqual(['Meal 2', 'Meal 3']);
  });

  it('should not call announceRemoval if the meal is not in searchMade', () => {
    const mealToRemove = 'Nonexistent Meal';
    component.searchMade = ['Meal 1', 'Meal 2', 'Meal 3'];

    component.remove(mealToRemove);

    expect(component.searchMade).toEqual(['Meal 1', 'Meal 2', 'Meal 3']);
  });
});
