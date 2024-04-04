import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  imports: [CommonModule, SearchRoutingModule, SharedModule],
  declarations: [],
})
export class SearchModule {}
