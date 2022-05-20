import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule)},
  { path: 'exam', loadChildren: () => import('./modules/exam/exam.module').then(mod => mod.ExamModule)},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
