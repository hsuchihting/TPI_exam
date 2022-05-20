import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthenticationGuard } from 'src/app/common/canactivate/authentication.guard';
import { AuthMenuGuard } from 'src/app/common/canactivate/authMenu.guard';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    // canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'authorization',
        loadChildren: () =>
          import('./authorization/authorization.module').then(
            (mod) => mod.AuthorizationModule
          ),
        data: {
          breadcrumb: '後台單位權限管理',
        },
      },
      {
        path: 'exam',
        loadChildren: () =>
          import('./exam/exam.module').then((mod) => mod.ExamModule),
        data: {
          breadcrumb: '測驗管理',
        },
      },
      {
        path: 'participant',
        loadChildren: () =>
          import('./participant/participant.module').then(
            (mod) => mod.ParticipantModule
          ),
        data: {
          breadcrumb: '受測者管理',
        },
      },
      {
        path: 'parameter',
        loadChildren: () =>
          import('./parameter/parameter.module').then(
            (mod) => mod.ParameterModule
          ),
        data: {
          breadcrumb: '參數管理',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
