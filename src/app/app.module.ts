import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NpcComponent } from './npc/npc.component';
import { GeneratorComponent } from './generator/generator.component';
import { NpcFormComponent } from './npc-form/npc-form.component';
import { NpcGeneratorComponent } from './npc-generator/npc-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    NpcComponent,
    NpcFormComponent,
    NpcGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
