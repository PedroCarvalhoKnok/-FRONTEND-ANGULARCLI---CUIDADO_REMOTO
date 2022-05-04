import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { UserRegisterComponent } from './user-register/user-register.component';
import {MatSelectModule} from '@angular/material/select';
import { CourseRegisterComponent } from './course-register/course-register.component';
import { UserListComponent } from './user-list/user-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {PortalModule} from '@angular/cdk/portal';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {LayoutModule} from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { NgxMaskModule } from 'ngx-mask';
import { CourseListComponent } from './course-list/course-list.component';
import { VacancyListComponent } from './vacancy-list/vacancy-list.component';
import { UrbanServicesComponent } from './vacancies-register/vacancies-register.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    CourseRegisterComponent,
    UserListComponent,
    CourseListComponent,
    VacancyListComponent,
    UrbanServicesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSliderModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    PortalModule,
    MatDialogModule,
    MatSidenavModule,
    MatDividerModule,
    LayoutModule,
    HttpClientModule,
    MatTableModule,
    NgxMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
