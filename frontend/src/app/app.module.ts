import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatTableModule, MatFormFieldModule ,MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, 
MatCardModule, MatDividerModule, MatSnackBarModule } from '@angular/material';

import { IssueService } from './issue.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponent,
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule, 
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule, 
    MatSelectModule, 
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatDividerModule, 
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [IssueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
