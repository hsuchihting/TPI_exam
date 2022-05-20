import { ViewEmailComponent } from './view-email/view-email.component';
import { EditEmailComponent } from './edit-email/edit-email.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialSharedModule } from 'src/app/common/material/angular-material-shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgSelectModule } from '@ng-select/ng-select';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { SharedModule } from '../../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialSharedModule,
    NgxMatSelectSearchModule,
    NgSelectModule,
    MtxSelectModule,
    SharedModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule
  ],
  declarations: [],
  exports: []
})
export class EmailModule { }
