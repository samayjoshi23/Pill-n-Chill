import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLandingPageComponent } from './Admin/admin-landing-page/admin-landing-page.component';
import { DashBoardComponent } from './Admin/dash-board/dash-board.component';
import { LandingPageComponent } from './Client/landing-page/landing-page.component';
import { ListPageComponent } from './Client/list-page/list-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'products',
    component: ListPageComponent,
  },

  // Admin Paths
  {
    path: 'admin',
    component: AdminLandingPageComponent,
    // children: [{
    //   path: 'dashboard',
    //   component: DashBoardComponent
    // }]
  },
  {
    path: 'admin/dashboard',
    component: DashBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
