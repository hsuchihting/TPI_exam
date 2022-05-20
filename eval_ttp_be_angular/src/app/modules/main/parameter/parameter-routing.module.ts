import { AddEditCategoryComponent } from './category-setting/addEditCategory/addEditCategory.component';
import { EmployeeStatusComponent } from './employee-status/employee-status.component';
import { PositionSettingComponent } from './position-setting/position-setting.component';
import { Routes, RouterModule } from '@angular/router';
import { CategorySettingComponent } from './category-setting/category-setting.component';
import { NgModule } from '@angular/core';
import { ParameterComponent } from './parameter.component';
import { AddEditEmploymentComponent } from './employee-status/addEditEmployment/addEditEmployment.component';
import { AddEditPositionComponent } from './position-setting/addEditPosition/addEditPosition.component';
import { AuthMenuGuard } from 'src/app/common/canactivate/authMenu.guard';

const routes: Routes = [
  {
    path: 'category-setting',
    component: ParameterComponent,
    canActivate:[AuthMenuGuard],
    data: {
      breadcrumb: '題目類別設定',
      menuId:'subject_setting.view'
    },
    children: [
      {
        path: '',
        component: CategorySettingComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: 'add-category',
        component: AddEditCategoryComponent,
        data: {
          breadcrumb: '新增題目類別',
        },
      },
      {
        path: 'edit-category',
        component: AddEditCategoryComponent,
        data: {
          breadcrumb: '編輯題目類別',
        },
      },
    ],
  },
  {
    path: 'employee-status',
    component: ParameterComponent,
    canActivate:[AuthMenuGuard],
    data: {
      breadcrumb: '就業狀況設定',
      menuId:'employ_setting.view'
    },
    children: [
      {
        path: '',
        component: EmployeeStatusComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: 'add-employment',
        component: AddEditEmploymentComponent,
        data: {
          breadcrumb: '新增就業狀況',
        },
      },
      {
        path: 'edit-employment',
        component: AddEditEmploymentComponent,
        data: {
          breadcrumb: '編輯就業狀況',
        },
      },
    ],
  },
  {
    path: 'position-setting',
    component: ParameterComponent,
    canActivate:[AuthMenuGuard],
    data: {
      breadcrumb: '職務別設定',
      menuId:'title_setting.view'
    },
    children: [
      {
        path: '',
        component: PositionSettingComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: 'add-position',
        component: AddEditPositionComponent,
        data: {
          breadcrumb: '新增職務別',
        },
      },
      {
        path: 'edit-position',
        component: AddEditPositionComponent,
        data: {
          breadcrumb: '編輯職務別',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParameterRoutingModule {}
