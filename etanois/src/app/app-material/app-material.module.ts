import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class AppMaterialModule { }
