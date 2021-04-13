import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NpcComponent } from './npc/npc.component';
import { GeneratorComponent } from './generator/generator.component';
import { NpcFormComponent } from './npc-form/npc-form.component';
import { NpcGeneratorComponent } from './npc-generator/npc-generator.component';
import { FormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ColorPickerModule } from 'ngx-color-picker';
import { AboutComponent } from './about/about.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    NpcComponent,
    NpcFormComponent,
    NpcGeneratorComponent,
    AboutComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AutocompleteLibModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
