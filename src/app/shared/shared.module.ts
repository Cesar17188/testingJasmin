import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighligthDirective } from './directives/highligth.directive';
import { ReversePipe } from './pipes/reverse.pipe';


@NgModule({
  declarations: [
    HighligthDirective,
    ReversePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighligthDirective,
    ReversePipe
  ]
})
export class SharedModule { }
