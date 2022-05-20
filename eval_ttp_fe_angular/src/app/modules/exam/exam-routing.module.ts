import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamComponent } from './exam.component';
import { InstructionComponent } from './instruction/instruction.component';
import { ThankComponent } from './thank/thank.component';
import { TestComponent } from './test/test.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TimeoutComponent } from 'src/app/common/components/timeout/timeout.component';
import { LogoutComponent } from 'src/app/common/components/logout/logout.component';
import { AuthenticationGuard } from 'src/app/common/canactivate/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: ExamComponent,
    //canActivate: [AuthenticationGuard],
    children: [
      { path: 'instruction', component: InstructionComponent },
      { path: 'thank', component: ThankComponent },
      { path: 'test/:id', component: TestComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'timeout', component: TimeoutComponent },
      { path: 'logout', component: LogoutComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamRoutingModule {}
