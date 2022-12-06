import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-routing';

  text: string = '';

  constructor(private http: HttpClient, private themeService: ThemeService) {}

  ngOnInit(): void {}

  submit(e: Event) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http
      .post('http://localhost:8080/api/', { text: this.text }, httpOptions)
      .subscribe((res) => console.log(res));
  }
}
