import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderInterceptor } from './common/interceptor/header.Interceptor';
import { ResponseHandlerInterceptor } from './common/interceptor/response-handler.Interceptor';
import { ErrorHandlerInterceptor } from './common/interceptor/error-handler.Interceptor';
import { NavService } from './common/components/sidenav/nav.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainModule } from './modules/main/main.module';
import { MainRoutingModule } from './modules/main/main-routing.module';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { AuthModule } from './modules/auth/auth.module';
import { QuestionTipComponent } from './common/components/question-tip/question-tip.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MainModule,
    MainRoutingModule,
    SocialLoginModule,
    AuthModule,
  ],
  providers: [
    NavService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '219946385615-dsblnvngsbcec6ajaq6kqd6kp8dofnv1.apps.googleusercontent.com'
            ),
          },
          // {
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider('clientId'),
          // },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
