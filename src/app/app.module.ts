import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { NavigationComponent } from './header/navigation.component';
import { LoginComponent } from './login/login.component';
import { SharedService } from './shared/shared.service';
import { LoginRouteGuard } from './login/login.router.guard';
import { UsermanageComponent } from './usermanage/usermanage.component';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoryComponent } from './history/history.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { DatePipe } from '@angular/common';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { ChartsComponent } from './charts/charts.component'
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { DashComponent } from './dash/dash.component';
import { MenuComponent } from './menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    DashboardComponent,
    AddRoomComponent,
    LoginComponent,
    UsermanageComponent,
    HistoryComponent,
    NavigationComponent,
    RoomlistComponent,
    ChartsComponent,
    SidenavComponent,
    DashComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    AngularMultiSelectModule,
    MatExpansionModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule
  ],
  providers: [SharedService, LoginRouteGuard,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
