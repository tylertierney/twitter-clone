import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

const materialModules = [MatIconModule];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...materialModules],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ...materialModules],
})
export class SharedModule {}
