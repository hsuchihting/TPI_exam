import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'src/app/common/canactivate/authentication.guard';
import { HomeComponent } from './home/home.component';
import { UiComponent } from './ui/ui.component';
import { RoleComponent } from './role/role.component';
import { AddRoleComponent } from './role/add-role/add-role.component';
import { AuthorizationComponent } from './authorization.component';
import { ListRoleComponent } from './role/list-role/list-role.component';
import { SetRoleComponent } from './role/set-role/set-role.component';
import { ModifyRoleComponent } from './role/modify-role/modify-role.component';
import { AuthMenuGuard } from 'src/app/common/canactivate/authMenu.guard';

const routes: Routes = [
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   data: {
  //     breadcrumb: '首頁',
  //   },
  // },
  // {
  //   path: 'ui',
  //   component: UiComponent,
  //   data: {
  //     breadcrumb: 'UI範例頁面',
  //   },
  // },
  {
    path: 'role',
    component: AuthorizationComponent,
    canActivate:[AuthMenuGuard],
    data: {
      breadcrumb: '角色設定',
      menuId:'role_setting.view'
    },
    children: [
      {
        path: '',
        component: RoleComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: 'add-role',
        component: AddRoleComponent,
        data: {
          breadcrumb: '新增角色',
        },
      },
      {
        path: 'list-role',
        component: ListRoleComponent,
        data: {
          breadcrumb: '角色成員',
        },
      },
      {
        path: 'set-role',
        component: SetRoleComponent,
        data: {
          breadcrumb: '設定成員',
        },
      },
      {
        path: 'modify-role',
        component: ModifyRoleComponent,
        data: {
          breadcrumb: '角色功能修改',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}

//123
