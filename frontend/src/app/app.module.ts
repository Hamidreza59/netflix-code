import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor} from './auth/interceptor';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './show-page/table/table.component';
import { ShowService } from './show-page/show.service';
import { AnalyticsService } from './analytics/analytics.service';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { UIService } from './shared/ui.service';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { ShowPageComponent, ReviewDialogComponent } from './show-page/show-page/show-page.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AnalyticsComponent } from './analytics/analytics/analytics.component';
import { ChartComponent } from './analytics/chart/chart.component';

//import { AuthModule} from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    SidenavListComponent,
    ShowPageComponent,
    ReviewDialogComponent,
    AnalyticsComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,
    MatDialogModule,
    ChartsModule
  ],
  entryComponents: [
    ReviewDialogComponent
  ],
  providers: [ AuthService, ShowService, UIService, AnalyticsService,
             { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
