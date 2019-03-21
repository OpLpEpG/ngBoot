import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ReaBotComponent } from './rea-bot/rea-bot.component';

@NgModule({
  declarations: [
    AppComponent,
    ReaBotComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
