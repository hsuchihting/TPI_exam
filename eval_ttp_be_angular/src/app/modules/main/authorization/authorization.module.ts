import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularMaterialSharedModule } from 'src/app/common/material/angular-material-shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { UiComponent } from './ui/ui.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DialogComponent } from './ui/dialog/dialog.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { RoleComponent } from './role/role.component';
import { AddRoleComponent } from './role/add-role/add-role.component';
import { SetRoleComponent } from './role/set-role/set-role.component';
import { ModifyRoleComponent } from './role/modify-role/modify-role.component';
import { ListRoleComponent } from './role/list-role/list-role.component';
import { AuthorizationComponent } from './authorization.component';
import { FilterPipe } from './role/roleFilter.pipe';

@NgModule({
  declarations: [
    AuthorizationComponent,
    HomeComponent,
    UiComponent,
    DialogComponent,
    // StyleWidthDirective,
    // EditorComponent,
    // EditorLimitValidatorDirective,
    RoleComponent,
    AddRoleComponent,
    // TruncatePipe,
    SetRoleComponent,
    ModifyRoleComponent,
    ListRoleComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    AngularMaterialSharedModule,
    NgxMatSelectSearchModule,
    NgSelectModule,
    MtxSelectModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    SweetAlert2Module.forRoot(),
    SharedModule,
  ],
  providers: [],
})
export class AuthorizationModule {}
