import { AngularMaterialSharedModule } from './../../../common/material/angular-material-shared.module';
import { SharedModule } from './../shared/shared.module';
import { StyleWidthDirective } from './../../../common/directive/styleWidth.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionSettingComponent } from './position-setting/position-setting.component';
import { EmployeeStatusComponent } from './employee-status/employee-status.component';
import { CategorySettingComponent } from './category-setting/category-setting.component';
import { ParameterRoutingModule } from './parameter-routing.module';
import { DialogComponent } from './dialog/dialog.component';
import { AddEditEmploymentComponent } from './employee-status/addEditEmployment/addEditEmployment.component';
import { AddEditCategoryComponent } from './category-setting/addEditCategory/addEditCategory.component';
import { AddEditPositionComponent } from './position-setting/addEditPosition/addEditPosition.component';

@NgModule({
  declarations: [
    CategorySettingComponent,
    EmployeeStatusComponent,
    PositionSettingComponent,
    AddEditCategoryComponent,
    DialogComponent,
    AddEditPositionComponent,
    AddEditEmploymentComponent,
  ],
  imports: [CommonModule,ParameterRoutingModule,AngularMaterialSharedModule,SharedModule,],
})
export class ParameterModule {}
