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
import { RoomlistComponent } from './roomlist/roomlist.component'

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
    RoomlistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NgxDatatableModule
  ],
  providers: [SharedService, LoginRouteGuard,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
