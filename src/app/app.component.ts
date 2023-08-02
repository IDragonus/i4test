import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'i4digital-test-ruben';
  person: any;

  ngOnInit() {
    this.obtenerLocalstorage();
  }

  constructor(private router: Router) {}

  obtenerLocalstorage() {
    this.person = JSON.parse(localStorage.getItem('persona') || '{}');
    console.log('persona', this.person);
  }

  logOut() {
    localStorage.removeItem('persona');
    this.person = {};
    console.log('LOGOUT', this.person);
    this.router.navigate(['/login']);
  }
}
