import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './components/inbox/inbox.component';
import { EmailDetailComponent } from './components/email-detail/email-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/inbox/primary', pathMatch: 'full' },
  { path: 'inbox', redirectTo: '/inbox/primary', pathMatch: 'full' },
  { path: 'inbox/detail/:id', component: EmailDetailComponent },
  { path: 'inbox/:tab', component: InboxComponent },
  { path: '**', redirectTo: '/inbox/primary' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
