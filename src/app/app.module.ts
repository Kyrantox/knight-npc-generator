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
import { ImageComponent } from './image/image.component';
import { ExportComponent } from './export/export.component';
import { ImportComponent } from './import/import.component';
import { BestiaryComponent } from './bestiary/bestiary.component';
import { MassImportComponent } from './mass-import/mass-import.component';
import { MassExportComponent } from './mass-export/mass-export.component';
import { ConstantsComponent } from './constants/constants.component';
import { WeaponComponent } from './weapon/weapon.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    NpcComponent,
    NpcFormComponent,
    NpcGeneratorComponent,
    AboutComponent,
    MainComponent,
    ImageComponent,
    ExportComponent,
    ImportComponent,
    BestiaryComponent,
    MassImportComponent,
    MassExportComponent,
    ConstantsComponent,
    WeaponComponent
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
