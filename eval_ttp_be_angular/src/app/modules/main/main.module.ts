import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { AngularMaterialSharedModule } from 'src/app/common/material/angular-material-shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { SidenavComponent } from 'src/app/common/components/sidenav/sidenav.component';
import { MenuListItemComponent } from 'src/app/common/components/sidenav/menu-list-item/menu-list-item.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BreadcrumbComponent } from 'src/app/common/components/breadcrumb/breadcrumb.component';
import { ParameterComponent } from './parameter/parameter.component';
import { ExamComponent } from './exam/exam.component';
@NgModule({
  declarations: [
    BreadcrumbComponent,
    MainComponent,
    HeaderComponent,
    SidenavComponent,
    MenuListItemComponent,
    ParameterComponent,
    // ParticipantComponent,
    ExamComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialSharedModule,
    NgxSpinnerModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
})
export class MainModule {}
