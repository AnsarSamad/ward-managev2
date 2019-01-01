import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { LoginComponent } from './login/login.component';
import { LoginRouteGuard } from './login/login.router.guard';
import { UsermanageComponent } from './usermanage/usermanage.component';
import { HistoryComponent } from './history/history.component';

const indexRoutes: Route = {
  path: '', component: LoginComponent
}

const fallbackRoutes: Route = {
  component: LoginComponent, path: "**"
}


const routes: Routes = [
  indexRoutes,
  { path: 'addroom', component: AddRoomComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'usermanage', component: UsermanageComponent, pathMatch: 'full' },
  { path: 'history', component: HistoryComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [LoginRouteGuard] },
  fallbackRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
