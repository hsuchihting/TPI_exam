import { AddPaperComponent } from './test-paper/add-paper/add-paper.component';
import { TestPaperComponent } from './test-paper/test-paper.component';
import { ViewTestComponent } from './test/view-test/view-test.component';
import { AddEditTestComponent } from './test/addEdit-test/addEdit-test.component';
import { TestComponent } from './test/test.component';

import { AddEditPrivacyComponent } from './privacy/addEdit-privacy/addEdit-privacy.component';

import { ViewEmailComponent } from './email/view-email/view-email.component';
import { AddEmailComponent } from './email/add-email/add-email.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestBookComponent } from './test-book/test-book.component';
import { SystemComponent } from './system/system.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { EmailComponent } from './email/email.component';
import { ExamComponent } from './exam.component';
import { AddEditSystemComponent } from './system/addEdit-system/addEdit-system.component';
import { ViewTestsGroupComponent } from './test-book/view-tests-group/viewTestsGroup.component';
import { AddTestsGroupComponent } from './test-book/addTestsGroup/addTestsGroup.component';
import { EditEmailComponent } from './email/edit-email/edit-email.component';
import { ViewPrivacyComponent } from './privacy/view-privacy/view-privacy.component';
import { ViewSystemComponent } from './system/view-system/view-system.component';
import { EditTestsGroupComponent } from './test-book/editTestsGroup/editTestsGroup.component';
import { EditPaperComponent } from './test-paper/edit-paper/edit-paper.component';
import { ViewPaperComponent } from './test-paper/view-paper/view-paper.component';
import { AuthMenuGuard } from 'src/app/common/canactivate/authMenu.guard';

const routes: Routes = [
  {
    path: 'email',
    component: ExamComponent,
    canActivate:[AuthMenuGuard],
    data: {
      breadcrumb: 'E-mail範本設定',
      menuId:'email_setting.view'
    },
    children: [
      {
        path: '',
        component: EmailComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: 'add-email',
        component: AddEmailComponent,
        data: {
          breadcrumb: '新增Email範本',
        },
      },
      {
        path: 'edit-email',
        component: EditEmailComponent,
        data: {
          breadcrumb: '編輯Email範本',
        },
      },
      {
        path: 'view-email',
        component: ViewEmailComponent,
        data: {
          breadcrumb: '檢視Email範本',
        },
      },
    ],
  },
  {
    path: 'system',
    component: ExamComponent,
    canActivate:[AuthMenuGuard],
    data: {
      breadcrumb: '系統說明設定',
      menuId:'sysdesc_setting.view'
    },
    children: [
      {
        path: '',
        component: SystemComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: 'add-system',
        component: AddEditSystemComponent,
        data: {
          breadcrumb: '新增系統說明',
        },
      },
      {
        path: 'edit-system',
        component: AddEditSystemComponent,
        data: {
          breadcrumb: '編輯系統說明',
        },
      },
      {
        path: 'view-system',
        component: ViewSystemComponent,
        data: {
          breadcrumb: '檢視系統說明',
        },
      },
    ],
  },
  {
    path: 'privacy',
    component: ExamComponent,
    canActivate:[AuthMenuGuard],
    data: {
      breadcrumb: '隱私權政策設定',
      menuId:'privacy_setting.view'
    },
    children: [
      {
        path: '',
        component: PrivacyComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: 'add-privacy',
        component: AddEditPrivacyComponent,
        data: {
          breadcrumb: '新增隱私權政策',
        },
      },
      {
        path: 'edit-privacy',
        component: AddEditPrivacyComponent,
        data: {
          breadcrumb: '編輯隱私權政策',
        },
      },
      {
        path: 'view-privacy',
        component: ViewPrivacyComponent,
        data: {
          breadcrumb: '檢視隱私權政策',
        },
      },
    ],
  },

  {
    path: 'test',
    component: ExamComponent,
    canActivate:[AuthMenuGuard],
    data: {
      breadcrumb: '測驗說明設定',
      menuId:'testdesc_setting.view'
    },
    children: [
      {
        path: '',
        component: TestComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: 'add-test',
        component: AddEditTestComponent,
        data: {
          breadcrumb: '新增測驗說明',
        },
      },
      {
        path: 'edit-test',
        component: AddEditTestComponent,
        data: {
          breadcrumb: '編輯測驗說明',
        },
      },
      {
        path: 'view-test',
        component: ViewTestComponent,
        data: {
          breadcrumb: '檢視測驗說明',
        },
      },
    ],
  },
  {
    path: 'test-paper',
    component: ExamComponent,
    canActivate:[AuthMenuGuard],
    data: {
      breadcrumb: '試卷設定',
      menuId:'tests_setting.view'
    },
    children: [
      {
        path: '',
        component: TestPaperComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: 'add-paper',
        component: AddPaperComponent,
        data: {
          breadcrumb: '新增試卷',
        },
      },
      {
        path: 'edit-paper',
        component: EditPaperComponent,
        data: {
          breadcrumb: '編輯試卷',
        },
      },
      {
        path: 'view-paper',
        component: ViewPaperComponent,
        data: {
          breadcrumb: '檢視試卷',
        },
      },
    ],
  },
  {
    path: 'test-book',
    component: ExamComponent,
    canActivate:[AuthMenuGuard],
    data: {
      breadcrumb: '題本設定',
      menuId:'testsgroup_setting.view'
    },
    children: [
      {
        path: '',
        component: TestBookComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: 'view-tests-group',
        component: ViewTestsGroupComponent,
        data: {
          breadcrumb: '檢視題本',
        },
      },
      {
        path: 'add-tests-group',
        component: AddTestsGroupComponent,
        data: {
          breadcrumb: '新增題本',
        },
      },
      {
        path: 'edit-tests-group',
        component: EditTestsGroupComponent,
        data: {
          breadcrumb: '編輯題本',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamRoutingModule {}
