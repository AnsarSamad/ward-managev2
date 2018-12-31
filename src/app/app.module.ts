import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { LoginComponent } from './login/login.component';
import { SharedService } from './shared/shared.service';
import { LoginRouteGuard } from './login/login.router.guard';
import { UsermanageComponent } from './usermanage/usermanage.component';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    DashboardComponent,
    AddRoomComponent,
    LoginComponent,
    UsermanageComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [SharedService, LoginRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
