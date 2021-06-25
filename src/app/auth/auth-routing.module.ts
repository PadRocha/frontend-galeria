import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '**', redirectTo: 'login' }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class AuthRoutingModule { }
