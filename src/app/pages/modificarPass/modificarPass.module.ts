import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';



import { modificarPass } from './modificarPass.component';


export const routes: Routes = [
  { path: '', component: modificarPass, pathMatch: 'full' }
];

@NgModule({

  imports:[
    CommonModule,
    RouterModule.forChild(routes),
    //modificarPass,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,




  ],
  declarations: [
    modificarPass
  ],
  providers:[{ provide: MAT_DATE_LOCALE, useValue: 'es-MX', }]
})
  export class modificarPassModule {}
