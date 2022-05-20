import { QuestionTipComponent } from './../../../common/components/question-tip/question-tip.component';
import { AnswerTipComponent } from './../../../common/components/answer-tip/answer-tip.component';
import { EditPaperComponent } from './test-paper/edit-paper/edit-paper.component';
import { ViewPaperComponent } from './test-paper/view-paper/view-paper.component';
import { AddPaperComponent } from './test-paper/add-paper/add-paper.component';
import { ViewSystemComponent } from './system/view-system/view-system.component';
import { ViewPrivacyComponent } from './privacy/view-privacy/view-privacy.component';
import { AddEditPrivacyComponent } from './privacy/addEdit-privacy/addEdit-privacy.component';
import { ViewEmailComponent } from './email/view-email/view-email.component';
import { SharedModule } from './../shared/shared.module';
import { AngularMaterialSharedModule } from './../../../common/material/angular-material-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamRoutingModule } from './exam-routing.module';
import { EmailComponent } from './email/email.component';
import { SystemComponent } from './system/system.component';
import { TestBookComponent } from './test-book/test-book.component';
import { PrivacyComponent } from './privacy/privacy.component';

import { AddEditSystemComponent } from './system/addEdit-system/addEdit-system.component';
import { TestComponent } from './test/test.component';
import { AddEditTestComponent } from './test/addEdit-test/addEdit-test.component';
import { ViewTestComponent } from './test/view-test/view-test.component';
import { TestPaperComponent } from './test-paper/test-paper.component';
import { ViewTestsGroupComponent } from './test-book/view-tests-group/viewTestsGroup.component';
import { AddTestsGroupComponent } from './test-book/addTestsGroup/addTestsGroup.component';
import { MtxSelectModule } from '@ng-matero/extensions';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AddEmailComponent } from './email/add-email/add-email.component';
import { EditTestsGroupComponent } from './test-book/editTestsGroup/editTestsGroup.component';
import { EditEmailComponent } from './email/edit-email/edit-email.component';

@NgModule({
  declarations: [
    EmailComponent,
    AddEmailComponent,
    EditEmailComponent,
    ViewEmailComponent,
    SystemComponent,
    AddEditSystemComponent,
    ViewSystemComponent,
    PrivacyComponent,
    AddEditPrivacyComponent,
    ViewPrivacyComponent,
    TestPaperComponent,
    AddPaperComponent,
    TestBookComponent,
    TestComponent,
    AddEditTestComponent,
    ViewTestComponent,
    ViewTestsGroupComponent,
    AddTestsGroupComponent,
    EditTestsGroupComponent,
    EditPaperComponent,
    AnswerTipComponent,
    ViewPaperComponent,
    QuestionTipComponent
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    AngularMaterialSharedModule,
    NgxMatSelectSearchModule,
    NgSelectModule,
    MtxSelectModule,
    SharedModule,
  ],
})
export class ExamModule {}
