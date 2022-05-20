import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestResultComponent } from './test-result/test-result.component';
import { ParticipantSettingComponent } from './participant-setting/participant-setting.component';
import { AddParticipantComponent } from './participant-setting/add-participant/add-participant.component';
import { ParticipantComponent } from './participant.component';
import { EditParticipantComponent } from './participant-setting/edit-participant/edit-participant.component';
import { TestResultChildComponent } from './test-result/test-result-child/test-result-child.component';
import { SendParticipantComponent } from './participant-setting/send-participant/send-participant.component';
import { AuthMenuGuard } from 'src/app/common/canactivate/authMenu.guard';

const routes: Routes = [
  {
    path: 'participant-setting',
    component: ParticipantComponent,
    canActivate:[AuthMenuGuard],
    data: {
      breadcrumb: '受測者設定',
      menuId:'tester_setting.view'
    },
    children: [
      {
        path: '',
        component: ParticipantSettingComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: 'add-participant',
        component: AddParticipantComponent,
        data: {
          breadcrumb: '新增受測者',
        },
      },
      {
        path: 'edit-participant',
        component: EditParticipantComponent,
        data: {
          breadcrumb: '編輯受測者',
        },
      },
      {
        path: 'send-participant',
        component: SendParticipantComponent,
        data: {
          breadcrumb: '寄送次數',
        },
      },
    ]
  },
  {
    path: 'test-result',
    component: ParticipantComponent,
    canActivate:[AuthMenuGuard],
    data: {
      breadcrumb: '測驗結果查詢',
      menuId:'testerresult_setting.view'
    },
    children: [
      {
        path: '',
        component: TestResultComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: 'test-result-child',
        component: TestResultChildComponent,
        data: {
          breadcrumb: '題本測驗結果',
        },
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipantRoutingModule {}
