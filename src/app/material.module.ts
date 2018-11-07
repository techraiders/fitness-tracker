import { NgModule } from "@angular/core";

import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';

const materialModules = [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule];

@NgModule({
  declarations: [],
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule {

}
