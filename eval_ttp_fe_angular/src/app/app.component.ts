import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LanguageService } from './common/services/language.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {
    this.languageService.setInitState();
  }
  public isLogin: boolean = true;
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigation = event as NavigationEnd;
        this.isLogin =
          navigation.url === '/login' ||
          navigation.urlAfterRedirects === '/login';
      });
  }
}
