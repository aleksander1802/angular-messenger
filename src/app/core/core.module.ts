import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
    declarations: [
    NotFoundComponent
  ],
    imports: [HttpClientModule],
})
export class CoreModule {}
