import { SharedModule } from './../shared/shared.module';
import { TestResultComponent } from './test-result/test-result.component';
import { ParticipantSettingComponent } from './participant-setting/participant-setting.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ParticipantRoutingModule } from './participant-routing.module';
import { AngularMaterialSharedModule } from 'src/app/common/material/angular-material-shared.module';
import { ParticipantComponent } from './participant.component';
import { AddParticipantComponent } from './participant-setting/add-participant/add-participant.component';
import { StyleWidthDirective } from 'src/app/common/directive/styleWidth.directive';
import { EditorLimitValidatorDirective } from 'src/app/common/validator/checkEditorWordLimit';
import { EditorComponent } from 'src/app/common/components/editor/editor.component';
import { TruncatePipe } from 'src/app/common/pipe/formatStringLength';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgSelectModule } from '@ng-select/ng-select';
import { MtxSelectModule } from '@ng-matero/extensions';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EditParticipantComponent } from './participant-setting/edit-participant/edit-participant.component';
import { DialogTestComponent } from './participant-setting/add-participant/dialog-test/dialog-test.component';
import { DialogParticipantComponent } from './participant-setting/add-participant/dialog-participant/dialog-participant.component';
import { SendParticipantComponent } from './participant-setting/send-participant/send-participant.component';
import { TestResultChildComponent } from './test-result/test-result-child/test-result-child.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CheckUserAuthDirective } from '../../auth/check-user-auth.directive';

@NgModule({
  declarations: [
    ParticipantComponent,
    ParticipantSettingComponent,
    AddParticipantComponent,
    TestResultComponent,
    EditParticipantComponent,
    DialogTestComponent,
    DialogParticipantComponent,
    TestResultChildComponent,
    SendParticipantComponent,
    //CheckUserAuthDirective

    ],
  imports: [
    CommonModule,
    ParticipantRoutingModule,
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
  providers: [DatePipe],


})
export class ParticipantModule {}
