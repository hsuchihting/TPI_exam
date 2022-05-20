import { LogoComponent } from './../../common/components/logo/logo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from './../../common/components/modal/modal.module';

import { ExamRoutingModule } from './exam-routing.module';
import { InstructionComponent } from './instruction/instruction.component';
import { ExamComponent } from './exam.component';
import { ThankComponent } from './thank/thank.component';
import { TestComponent } from './test/test.component';
import { LanguageModule } from '../language.module';
import { PrivacyComponent } from './privacy/privacy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { DialogueComponent } from './instruction/dialogue/dialogue.component';

import { HurryupModalComponent } from './../../common/components/modal/hurryup-modal/hurryup-modal.component';
import { TimesupModalComponent } from 'src/app/common/components/modal/timesup-modal/timesup-modal.component';
import { UncompletedModalComponent } from 'src/app/common/components/modal/uncompleted-modal/uncompleted-modal.component';

import { FinishModalComponent } from 'src/app/common/components/modal/finish-modal/finish-modal.component';
import { DotestModalComponent } from './../../common/components/modal/dotest-modal/dotest-modal.component';

import { TimeoutComponent } from '../../common/components/timeout/timeout.component';
import { ProcessComponent } from 'src/app/common/components/process/process.component';
import { FileUploadComponent } from 'src/app/common/components/file-upload/file-upload.component';
import { LogoutComponent } from 'src/app/common/components/logout/logout.component';

@NgModule({
  declarations: [
    InstructionComponent,
    ExamComponent,
    ThankComponent,
    TestComponent,
    PrivacyComponent,
    DialogueComponent,
    UncompletedModalComponent,
    HurryupModalComponent,
    TimesupModalComponent,
    DotestModalComponent,
    TimeoutComponent,
    ProcessComponent,
    LogoComponent,
    FileUploadComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    LanguageModule,
    FormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    ReactiveFormsModule,
    ModalModule,
  ],
  providers: [],
})
export class ExamModule {}
