import { NgModule } from '@angular/core';
import { CommonModule, formatCurrency } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LanguageModule } from '../language.module';
import { LoadingService } from 'src/app/common/services/loading.service';
import { FooterComponent } from 'src/app/common/components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinishModalComponent } from 'src/app/common/components/modal/finish-modal/finish-modal.component';
import { ModalModule } from 'src/app/common/components/modal/modal.module';

@NgModule({
  declarations: [LoginComponent, FinishModalComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    LanguageModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  providers: [LoadingService],
})
export class AuthModule {}
