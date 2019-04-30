import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ReaBotComponent } from './rea-bot/rea-bot.component';
import { HttpClientModule } from '@angular/common/http';
import { ChipService } from './chip.service';
import { BootFileService } from './boot-file.service';

@NgModule({
  declarations: [
    AppComponent,
    ReaBotComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ChipService, BootFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
