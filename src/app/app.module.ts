import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxPrintElementModule } from 'ngx-print-element';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorsComponent } from './form-errors/form-errors.component';

@NgModule({
  declarations: [
    AppComponent,
    FormErrorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintElementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
