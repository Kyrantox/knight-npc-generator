import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BestiaryComponent } from './bestiary/bestiary.component';
import { ConstantsComponent } from './constants/constants.component';
import { GeneratorComponent } from './generator/generator.component';
import { MainComponent } from './main/main.component';
import { WeaponComponent } from './weapon/weapon.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: GeneratorComponent },
      { path: 'bestiary', component: BestiaryComponent },
      { path: 'weapon', component: WeaponComponent },
      { path: 'about', component: AboutComponent },
      { path: 'constants', component: ConstantsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
