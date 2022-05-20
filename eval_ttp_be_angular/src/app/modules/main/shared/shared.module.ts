import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StyleWidthDirective } from 'src/app/common/directive/styleWidth.directive';
import { AngularMaterialSharedModule } from 'src/app/common/material/angular-material-shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgSelectModule } from '@ng-select/ng-select';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EditorComponent } from 'src/app/common/components/editor/editor.component';
import { EditorLimitValidatorDirective } from 'src/app/common/validator/checkEditorWordLimit';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TruncatePipe } from 'src/app/common/pipe/formatStringLength';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FileUploadComponent } from 'src/app/common/components/file-upload/file-upload.component';
import { CheckUserAuthDirective } from '../../auth/check-user-auth.directive';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    FileUploadComponent,
    StyleWidthDirective,
    EditorComponent,
    EditorLimitValidatorDirective,
    TruncatePipe,
    CheckUserAuthDirective
  ],
  imports: [
    CommonModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,

  ],
  exports: [
    CommonModule,
    StyleWidthDirective,
    EditorModule,
    EditorComponent,
    EditorLimitValidatorDirective,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialSharedModule,
    NgxMatSelectSearchModule,
    NgSelectModule,
    MtxSelectModule,
    TruncatePipe,
    SweetAlert2Module,
    FileUploadComponent,
    CheckUserAuthDirective,
    MatSelectModule,
    MatOptionModule,
    MatInputModule
  ],
})
export class SharedModule {}
